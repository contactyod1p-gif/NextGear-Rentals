import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import rentalsRouter from "./rentals";

const router: IRouter = Router();

router.use(healthRouter);
router.use(rentalsRouter);
router.use(bookingsRouter);

export default router;
