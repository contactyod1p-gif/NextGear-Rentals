import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import bookingsRouter from "./bookings";
import rentalsRouter from "./rentals";

const router: IRouter = Router();

// Public routes — no authentication required
router.use(healthRouter);
router.use(authRouter);
router.use(rentalsRouter);

// Admin-protected routes — all require a valid Bearer token (see adminAuth middleware)
router.use(bookingsRouter);

export default router;
