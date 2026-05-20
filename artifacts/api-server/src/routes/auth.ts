import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import crypto from "node:crypto";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

// Extremely tight rate limiter on login — 10 attempts per 15 minutes per IP.
// This severely limits brute-force viability even against a weak key.
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many login attempts from this IP — please wait 15 minutes before trying again.",
  },
  skip: () => process.env.NODE_ENV === "test",
});

const router = Router();

/**
 * POST /api/admin/login
 *
 * Validates the submitted password against the ADMIN_API_KEY secret.
 * On success, returns the token that must be sent as a Bearer header on all
 * subsequent admin API calls.
 *
 * A fixed 400 ms delay is injected on every failure to raise the cost of
 * automated brute-force attacks even when rate limiting is bypassed.
 */
router.post("/admin/login", loginRateLimiter, (req, res) => {
  const adminApiKey = process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
    req.log.error("ADMIN_API_KEY is not configured — cannot authenticate admin");
    res.status(503).json({
      error: "Admin authentication is not configured on this server.",
    });
    return;
  }

  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Password is required" });
    return;
  }

  const { password } = parsed.data;

  let valid = false;
  try {
    const passwordBuf = Buffer.from(password);
    const keyBuf = Buffer.from(adminApiKey);
    valid =
      passwordBuf.length === keyBuf.length &&
      crypto.timingSafeEqual(passwordBuf, keyBuf);
  } catch {
    valid = false;
  }

  if (!valid) {
    req.log.warn({ ip: req.ip }, "Failed admin login attempt");
    // Fixed delay on failure — makes each attempt take ~400 ms minimum,
    // multiplying the real-world cost of automated enumeration.
    setTimeout(() => {
      res.status(401).json({ error: "Incorrect password. Please try again." });
    }, 400);
    return;
  }

  req.log.info({ ip: req.ip }, "Successful admin login");
  res.json({ token: adminApiKey });
});

export default router;
