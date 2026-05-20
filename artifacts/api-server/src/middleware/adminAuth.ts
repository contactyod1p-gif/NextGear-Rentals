import type { Request, Response, NextFunction } from "express";
import crypto from "node:crypto";

/**
 * Express middleware that enforces admin-only access via a Bearer token.
 *
 * The token is validated against the ADMIN_API_KEY environment secret using a
 * timing-safe comparison so the check itself cannot be exploited as a timing
 * oracle to brute-force the key character by character.
 *
 * Every rejection is logged at warn level (without revealing the attempted
 * token) so failed access attempts are visible in production log streams.
 */
export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const adminApiKey = process.env.ADMIN_API_KEY;

  if (!adminApiKey) {
    req.log.error("ADMIN_API_KEY secret is not configured — admin routes are disabled");
    res.status(503).json({
      error: "Admin access is not configured on this server. Contact the system administrator.",
    });
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    req.log.warn({ ip: req.ip, url: req.url }, "Admin request missing Bearer token");
    res.status(401).json({ error: "Authorization required. Provide a valid Bearer token." });
    return;
  }

  const token = authHeader.slice(7); // strip "Bearer "

  let valid = false;
  try {
    const tokenBuf = Buffer.from(token);
    const keyBuf = Buffer.from(adminApiKey);
    // Buffers must be the same byte-length for timingSafeEqual
    valid =
      tokenBuf.length === keyBuf.length &&
      crypto.timingSafeEqual(tokenBuf, keyBuf);
  } catch {
    valid = false;
  }

  if (!valid) {
    req.log.warn({ ip: req.ip, url: req.url }, "Admin request with invalid Bearer token");
    res.status(401).json({ error: "Invalid admin token. Access denied." });
    return;
  }

  next();
}
