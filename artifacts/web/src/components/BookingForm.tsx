import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues, FieldError, Resolver } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod/v4";
import { useCreateRentalBook } from "@workspace/api-client-react";
import BookingSuccessModal from "./BookingSuccessModal";

function makeZodResolver<T extends z.ZodType<FieldValues>>(schema: T): Resolver<z.infer<T>> {
  return (async (values: FieldValues) => {
    const result = schema.safeParse(values);
    if (result.success) return { values: result.data, errors: {} };
    const errors: Record<string, FieldError> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.length > 0 ? issue.path.join(".") : "root";
      if (!errors[path]) errors[path] = { type: issue.code, message: issue.message };
    }
    return { values: {}, errors };
  }) as unknown as Resolver<z.infer<T>>;
}

const VEHICLES = [
  "BMW 3 Series",
  "Mahindra Thar 4x4",
  "Maruti Swift VXI",
  "Hyundai i20 Asta",
] as const;

const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(20, "Phone number is too long")
    .regex(/^\+?[\d\s\-(). ]{7,20}$/, "Enter a valid phone number (e.g. +91 98765 43210)"),
  selectedVehicle: z.enum(VEHICLES, { error: "Please select a vehicle" }),
  rentalDays: z
    .number({ error: "Rental days must be a number" })
    .int("Must be a whole number")
    .min(1, "Minimum 1 day")
    .max(90, "Maximum 90 days"),
  bookingDate: z
    .string()
    .min(1, "Please select a date")
    .refine((d) => {
      const date = new Date(d);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, "Booking date cannot be in the past"),
});

type BookingFormData = z.infer<typeof bookingSchema>;
type SubmitError = "validation" | "rate_limit" | "server" | null;

interface SuccessData {
  reference: string;
  bookingId: number;
  vehicle: string;
  rentalDays: number;
  bookingDate: string;
}

function FieldErrorMsg({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/15 focus:bg-white/8 hover:border-white/20";

const inputError =
  "border-red-500/50 focus:border-red-400/60 focus:ring-red-400/15";

const ERROR_MESSAGES: Record<NonNullable<SubmitError>, string> = {
  validation: "Some fields are invalid. Please check your input and try again.",
  rate_limit: "Too many booking attempts. Please wait 15 minutes before trying again.",
  server: "Something went wrong on our end. Please try again in a moment.",
};

export default function BookingForm() {
  const [submitError, setSubmitError] = useState<SubmitError>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: makeZodResolver(bookingSchema),
    mode: "onTouched",
  });

  const { mutateAsync: createRentalBook } = useCreateRentalBook();

  async function onSubmit(data: BookingFormData) {
    setSubmitError(null);
    try {
      const result = await createRentalBook({
        data: {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          selectedVehicle: data.selectedVehicle,
          rentalDays: data.rentalDays,
          bookingDate: new Date(data.bookingDate).toISOString(),
        },
      });

      setSuccessData({
        reference: result.reference,
        bookingId: result.bookingId,
        vehicle: data.selectedVehicle,
        rentalDays: data.rentalDays,
        bookingDate: data.bookingDate,
      });
      setModalOpen(true);
      reset();
    } catch (err: unknown) {
      const status = (err as { status?: number })?.status;
      if (status === 429) {
        setSubmitError("rate_limit");
      } else if (status === 400) {
        setSubmitError("validation");
      } else {
        setSubmitError("server");
      }
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <BookingSuccessModal
        open={modalOpen}
        reference={successData?.reference ?? ""}
        vehicle={successData?.vehicle ?? ""}
        rentalDays={successData?.rentalDays ?? 0}
        bookingDate={successData?.bookingDate ?? ""}
        onClose={() => setModalOpen(false)}
      />

      <section id="book" className="bg-[#08090a] py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
              Reserve Your Ride
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Book in{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
              >
                Minutes
              </span>
            </h2>
            <p className="mt-4 text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              Fill in the details below and our Baraut team will confirm your booking within 15 minutes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl border border-white/8 bg-white/[0.03] p-8 sm:p-10 backdrop-blur-sm"
            style={{ boxShadow: "0 0 80px rgba(234,179,8,0.04), 0 1px 0 rgba(255,255,255,0.06) inset" }}
          >
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(234,179,8,0.06) 0%, transparent 70%)" }}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="Arjun Sharma"
                    autoComplete="name"
                    className={`${inputBase} ${errors.fullName ? inputError : ""}`}
                  />
                  <FieldErrorMsg message={errors.fullName?.message} />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className={`${inputBase} ${errors.phoneNumber ? inputError : ""}`}
                  />
                  <FieldErrorMsg message={errors.phoneNumber?.message} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                  Select Vehicle
                </label>
                <div className="relative">
                  <select
                    {...register("selectedVehicle")}
                    className={`${inputBase} appearance-none pr-10 cursor-pointer ${errors.selectedVehicle ? inputError : ""}`}
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-400">
                      Choose your vehicle...
                    </option>
                    {VEHICLES.map((v) => (
                      <option key={v} value={v} className="bg-zinc-900 text-white">
                        {v}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <FieldErrorMsg message={errors.selectedVehicle?.message} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Rental Duration
                  </label>
                  <div className="relative">
                    <input
                      {...register("rentalDays", { valueAsNumber: true })}
                      type="number"
                      min={1}
                      max={90}
                      placeholder="3"
                      className={`${inputBase} pr-14 ${errors.rentalDays ? inputError : ""}`}
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                      days
                    </span>
                  </div>
                  <FieldErrorMsg message={errors.rentalDays?.message} />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Pickup Date
                  </label>
                  <input
                    {...register("bookingDate")}
                    type="date"
                    min={today}
                    className={`${inputBase} ${errors.bookingDate ? inputError : ""} [color-scheme:dark]`}
                  />
                  <FieldErrorMsg message={errors.bookingDate?.message} />
                </div>
              </div>

              <AnimatePresence>
                {submitError && (
                  <motion.div
                    key={submitError}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl border px-4 py-3 text-sm flex items-start gap-3 ${
                      submitError === "rate_limit"
                        ? "border-orange-500/30 bg-orange-500/10 text-orange-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    }`}
                  >
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {ERROR_MESSAGES[submitError]}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="transform-gpu mt-2 w-full rounded-xl bg-yellow-400 py-4 text-sm font-bold text-zinc-900 shadow-lg shadow-yellow-400/20 transition-all duration-200 hover:bg-yellow-300 hover:shadow-yellow-400/35 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-yellow-400"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking →"
                )}
              </motion.button>

              <p className="text-center text-xs text-zinc-600">
                By booking, you agree to our{" "}
                <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
                . No payment required upfront.
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-4 text-center"
          >
            {[
              { icon: "🛡️", label: "Fully Insured" },
              { icon: "🔑", label: "Instant Confirmation" },
              { icon: "🚗", label: "Free Cancellation" },
            ].map(({ icon, label }) => (
              <div key={label} className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
                <div className="text-xl mb-1">{icon}</div>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
