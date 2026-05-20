import { Router } from "express";
import rateLimit from "express-rate-limit";
import { db, bookingsTable } from "@workspace/db";
import { eq, count, avg } from "drizzle-orm";
import {
  CreateBookingBody,
  GetBookingParams,
  DeleteBookingParams,
} from "@workspace/api-zod";

// ─── Rate Limiters ────────────────────────────────────────────────────────────
// The global limiter in app.ts enforces 100 req/15 min across all /api routes.
// Destructive/write operations on bookings get an additional tighter cap.
const bookingWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,                 // max 20 write requests per window per IP (admin ops)
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error:
      "Too many booking modification requests from this IP — please wait 15 minutes.",
  },
  skip: () => process.env.NODE_ENV === "test",
});

const router = Router();

// GET /api/bookings — list all bookings (read-only, covered by global limiter)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(bookingsTable.bookingDate);
    res.json(bookings.map(normalizeBooking));
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Failed to list bookings" });
  }
});

// POST /api/bookings — create booking (internal/admin, tighter write limit)
router.post("/bookings", bookingWriteLimiter, async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: parsed.error.issues.map((i: { path: (string | number)[]; message: string }) => ({
        field: i.path[0] ?? null,
        message: i.message,
      })),
    });
    return;
  }

  const { fullName, phoneNumber, selectedVehicle, rentalDays, bookingDate } =
    parsed.data;

  try {
    const [booking] = await db
      .insert(bookingsTable)
      .values({
        fullName,
        phoneNumber,
        selectedVehicle,
        rentalDays,
        bookingDate: new Date(bookingDate),
      })
      .returning();

    res.status(201).json(normalizeBooking(booking));
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// GET /api/bookings/stats/summary — aggregated stats (read-only)
router.get("/bookings/stats/summary", async (req, res) => {
  try {
    const [totalRow] = await db
      .select({ total: count() })
      .from(bookingsTable);
    const [avgRow] = await db
      .select({ avg: avg(bookingsTable.rentalDays) })
      .from(bookingsTable);

    const vehicleRows = await db
      .select({
        vehicle: bookingsTable.selectedVehicle,
        count: count(),
      })
      .from(bookingsTable)
      .groupBy(bookingsTable.selectedVehicle);

    res.json({
      totalBookings: totalRow?.total ?? 0,
      averageRentalDays: parseFloat(avgRow?.avg ?? "0"),
      vehicleBreakdown: vehicleRows.map((r: { vehicle: string; count: number }) => ({
        vehicle: r.vehicle,
        count: r.count,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get booking stats");
    res.status(500).json({ error: "Failed to get booking stats" });
  }
});

// GET /api/bookings/:id — single booking lookup, validates ID param
router.get("/bookings/:id", async (req, res) => {
  const parsed = GetBookingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking ID — must be a positive integer" });
    return;
  }

  try {
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, parsed.data.id));

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(normalizeBooking(booking));
  } catch (err) {
    req.log.error({ err }, "Failed to get booking");
    res.status(500).json({ error: "Failed to get booking" });
  }
});

// DELETE /api/bookings/:id — hard delete, write limiter applied
router.delete("/bookings/:id", bookingWriteLimiter, async (req, res) => {
  const parsed = DeleteBookingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking ID — must be a positive integer" });
    return;
  }

  try {
    const [deleted] = await db
      .delete(bookingsTable)
      .where(eq(bookingsTable.id, parsed.data.id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete booking");
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

// ─── Normalizer ───────────────────────────────────────────────────────────────
// Serializes a raw DB row into a safe, consistent API response shape.
// Ensures bookingDate is always an ISO 8601 string regardless of DB driver output.
function normalizeBooking(booking: typeof bookingsTable.$inferSelect) {
  return {
    id: booking.id,
    fullName: booking.fullName,
    phoneNumber: booking.phoneNumber,
    selectedVehicle: booking.selectedVehicle,
    rentalDays: booking.rentalDays,
    bookingDate:
      booking.bookingDate instanceof Date
        ? booking.bookingDate.toISOString()
        : booking.bookingDate,
  };
}

export default router;
