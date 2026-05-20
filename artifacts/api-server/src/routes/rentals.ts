import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { db, bookingsTable } from "@workspace/db";

const ALLOWED_VEHICLES = [
  "Mahindra Thar",
  "Toyota Innova",
  "Hyundai Creta",
  "Toyota Fortuner",
  "Mercedes GLC",
  "Kia Carens",
] as const;

const rentalBookSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name is too long")
    .regex(/^[a-zA-Z\s'\-]+$/, "Full name contains invalid characters"),
  phoneNumber: z
    .string()
    .min(7, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(
      /^\+?[\d\s\-(). ]{7,20}$/,
      "Phone number must be a valid format (e.g. +91 98765 43210)"
    ),
  selectedVehicle: z.enum([...ALLOWED_VEHICLES], {
    message: `Vehicle must be one of: ${ALLOWED_VEHICLES.join(", ")}`,
  }),
  rentalDays: z
    .number({ invalid_type_error: "rentalDays must be a number" })
    .int("rentalDays must be a whole number")
    .min(1, "Minimum rental is 1 day")
    .max(90, "Maximum rental is 90 days"),
  bookingDate: z
    .string()
    .datetime({ message: "bookingDate must be a valid ISO 8601 datetime string" }),
});

const bookingRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many booking requests from this IP — please wait 15 minutes before trying again.",
  },
  skipSuccessfulRequests: false,
});

const router = Router();

router.post("/rentals/book", bookingRateLimiter, async (req, res) => {
  const parsed = rentalBookSchema.safeParse(req.body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    res.status(400).json({
      error: firstIssue?.message ?? "Invalid request body",
      field: firstIssue?.path?.[0] ?? null,
      details: parsed.error.issues.map((i: z.ZodIssue) => ({
        field: i.path[0] ?? null,
        message: i.message,
      })),
    });
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

    if (!booking) {
      req.log.error("DB insert returned no rows for rental booking");
      res.status(500).json({ error: "Booking could not be persisted" });
      return;
    }

    const reference = `NGR-${String(booking.id).padStart(5, "0")}`;

    req.log.info({ bookingId: booking.id, reference, vehicle: selectedVehicle }, "Rental booking created");

    res.status(201).json({
      success: true,
      bookingId: booking.id,
      reference,
      message: "Your booking is confirmed. Our team will contact you within 15 minutes.",
      booking: {
        id: booking.id,
        fullName: booking.fullName,
        phoneNumber: booking.phoneNumber,
        selectedVehicle: booking.selectedVehicle,
        rentalDays: booking.rentalDays,
        bookingDate: booking.bookingDate instanceof Date
          ? booking.bookingDate.toISOString()
          : booking.bookingDate,
      },
    });
  } catch (err) {
    req.log.error({ err }, "Failed to insert rental booking");
    res.status(500).json({ error: "An unexpected error occurred. Please try again." });
  }
});

export default router;
