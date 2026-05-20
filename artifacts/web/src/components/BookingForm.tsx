import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues, FieldError, Resolver } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod/v4";
import { useCreateBooking } from "@workspace/api-client-react";

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
  "Mahindra Thar",
  "Toyota Innova",
  "Hyundai Creta",
  "Toyota Fortuner",
  "Mercedes GLC",
  "Kia Carens",
] as const;

const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[\d\s\-()]+$/, "Enter a valid phone number"),
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

type SubmitState = "idle" | "success" | "error";

function FieldError({ message }: { message?: string }) {
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

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/15 focus:bg-white/8 hover:border-white/20";

const inputErrorClass =
  "border-red-500/50 focus:border-red-400/60 focus:ring-red-400/15";

export default function BookingForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [bookingRef, setBookingRef] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: makeZodResolver(bookingSchema),
    mode: "onTouched",
  });

  const { mutateAsync: createBooking } = useCreateBooking();

  async function onSubmit(data: BookingFormData) {
    setSubmitState("idle");
    try {
      const result = await createBooking({
        data: {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          selectedVehicle: data.selectedVehicle,
          rentalDays: data.rentalDays,
          bookingDate: new Date(data.bookingDate).toISOString(),
        },
      });
      setBookingRef(result.id);
      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
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
            Fill in the details below and our team will confirm your booking within 15 minutes.
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
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(234,179,8,0.06) 0%, transparent 70%)" }}
          />

          <AnimatePresence mode="wait">
            {submitState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 flex flex-col items-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-green-400/15 border border-green-400/30 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
                {bookingRef && (
                  <p className="text-xs text-zinc-500 mb-1">
                    Reference:{" "}
                    <span className="font-mono text-yellow-400">NGR-{String(bookingRef).padStart(5, "0")}</span>
                  </p>
                )}
                <p className="text-sm text-zinc-400 max-w-xs">
                  We'll contact you within 15 minutes to finalize your reservation.
                </p>
                <button
                  onClick={() => { setSubmitState("idle"); setBookingRef(null); }}
                  className="mt-8 transform-gpu text-sm font-semibold text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-white rounded-full px-6 py-2.5 transition-all duration-200"
                >
                  Make another booking
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-10 space-y-5"
                noValidate
              >
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
                      className={`${inputClass} ${errors.fullName ? inputErrorClass : ""}`}
                    />
                    <FieldError message={errors.fullName?.message} />
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
                      className={`${inputClass} ${errors.phoneNumber ? inputErrorClass : ""}`}
                    />
                    <FieldError message={errors.phoneNumber?.message} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Select Vehicle
                  </label>
                  <div className="relative">
                    <select
                      {...register("selectedVehicle")}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer ${errors.selectedVehicle ? inputErrorClass : ""}`}
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
                  <FieldError message={errors.selectedVehicle?.message} />
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
                        className={`${inputClass} pr-14 ${errors.rentalDays ? inputErrorClass : ""}`}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                        days
                      </span>
                    </div>
                    <FieldError message={errors.rentalDays?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                      Pickup Date
                    </label>
                    <input
                      {...register("bookingDate")}
                      type="date"
                      min={today}
                      className={`${inputClass} ${errors.bookingDate ? inputErrorClass : ""} [color-scheme:dark]`}
                    />
                    <FieldError message={errors.bookingDate?.message} />
                  </div>
                </div>

                <AnimatePresence>
                  {submitState === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                      Something went wrong submitting your booking. Please try again.
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
              </motion.form>
            )}
          </AnimatePresence>
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
            <div
              key={label}
              className="rounded-xl border border-white/6 bg-white/[0.02] p-3"
            >
              <div className="text-xl mb-1">{icon}</div>
              <p className="text-xs text-zinc-500">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
