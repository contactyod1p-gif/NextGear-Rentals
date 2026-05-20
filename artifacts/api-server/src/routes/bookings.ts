import { Router } from "express";
import { db, bookingsTable } from "@workspace/db";
import { eq, count, avg, sql } from "drizzle-orm";
import {
  CreateBookingBody,
  GetBookingParams,
  DeleteBookingParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/bookings", async (req, res) => {
  try {
    const bookings = await db.select().from(bookingsTable).orderBy(bookingsTable.bookingDate);
    res.json(bookings.map(normalizeBooking));
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Failed to list bookings" });
  }
});

router.post("/bookings", async (req, res) => {
  const parsed = CreateBookingBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, phoneNumber, selectedVehicle, rentalDays, bookingDate } = parsed.data;

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

router.get("/bookings/stats/summary", async (req, res) => {
  try {
    const [totalRow] = await db.select({ total: count() }).from(bookingsTable);
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
      vehicleBreakdown: vehicleRows.map((r) => ({
        vehicle: r.vehicle,
        count: r.count,
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get booking stats");
    res.status(500).json({ error: "Failed to get booking stats" });
  }
});

router.get("/bookings/:id", async (req, res) => {
  const parsed = GetBookingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking ID" });
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

router.delete("/bookings/:id", async (req, res) => {
  const parsed = DeleteBookingParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid booking ID" });
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

function normalizeBooking(booking: typeof bookingsTable.$inferSelect) {
  return {
    id: booking.id,
    fullName: booking.fullName,
    phoneNumber: booking.phoneNumber,
    selectedVehicle: booking.selectedVehicle,
    rentalDays: booking.rentalDays,
    bookingDate: booking.bookingDate instanceof Date
      ? booking.bookingDate.toISOString()
      : booking.bookingDate,
  };
}

export default router;
