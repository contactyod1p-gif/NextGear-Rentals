import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// ─── Security Headers ────────────────────────────────────────────────────────
// Helmet sets 11 security-related HTTP headers (X-Content-Type-Options,
// Strict-Transport-Security, X-Frame-Options, etc.) to harden the API surface.
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// ─── CORS ────────────────────────────────────────────────────────────────────
// Origin allowlist is driven exclusively by the CORS_ORIGIN env var.
// Multiple origins can be comma-separated. In production this MUST be set.
const rawCorsOrigin = process.env.CORS_ORIGIN ?? "";
const allowedOrigins = rawCorsOrigin
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin:
      allowedOrigins.length > 0
        ? (origin, callback) => {
            // Allow server-to-server requests (no Origin header) and listed origins only.
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              logger.warn({ origin }, "CORS: rejected request from unlisted origin");
              callback(new Error("Not allowed by CORS policy"));
            }
          }
        : true,
    credentials: true,
  }),
);

// ─── Structured Request Logging ──────────────────────────────────────────────
// pino-http logs every request/response. Sensitive headers are redacted so
// auth tokens and cookies never appear in log output.
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          // Strip query strings from logged URLs to avoid leaking search params.
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ─── Body Parsing with Strict Size Limits ────────────────────────────────────
// The 10 kb cap blocks payload-flood / memory exhaustion attacks before any
// route handler or validation logic ever runs.
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ─── Global Rate Limiter ──────────────────────────────────────────────────────
// Applied to every /api/* route. Blocks brute-force and automation scripts.
// Sensitive endpoints (e.g. POST /api/rentals/book) apply an additional,
// tighter limiter defined in their own route file (5 req / 15 min).
const globalApiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // max 100 requests per window per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error:
      "Too many requests from this IP — please wait 15 minutes before trying again.",
  },
  skip: () => process.env.NODE_ENV === "test",
});

app.use("/api", globalApiRateLimiter);
app.use("/api", router);

// ─── Global Error Handler ─────────────────────────────────────────────────────
// MUST be registered with 4 parameters so Express identifies it as an error
// handler. Catches any error passed via next(err) or thrown by async handlers.
// Logs the full error server-side (structured) but returns only a safe message
// to the client — no stack traces, no internal details.
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const status =
    typeof (err as { status?: unknown })?.status === "number" &&
    (err as { status: number }).status >= 100 &&
    (err as { status: number }).status < 600
      ? (err as { status: number }).status
      : 500;

  // For client errors (4xx) surface the message; for server errors (5xx) use a
  // generic string so we never leak implementation details to attackers.
  const clientMessage =
    status < 500
      ? String((err as { message?: string })?.message ?? "Bad request")
      : "An unexpected error occurred. Please try again.";

  // Structured server-side log — full error detail, safe for internal use only.
  if (req.log) {
    req.log.error({ err }, "Unhandled error in request pipeline");
  } else {
    logger.error({ err, url: req.url, method: req.method }, "Unhandled error");
  }

  if (!res.headersSent) {
    res.status(status).json({ error: clientMessage });
  }
});

export default app;
