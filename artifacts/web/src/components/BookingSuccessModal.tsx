import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BookingSuccessModalProps {
  open: boolean;
  reference: string;
  vehicle: string;
  rentalDays: number;
  bookingDate: string;
  onClose: () => void;
}

function Particle({ index }: { index: number }) {
  const angle = (index / 16) * 360;
  const distance = 60 + Math.random() * 60;
  const size = 3 + Math.random() * 5;
  const colors = ["#facc15", "#fbbf24", "#f59e0b", "#ffffff", "#fde68a"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: "50%",
        left: "50%",
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * distance,
        y: Math.sin((angle * Math.PI) / 180) * distance,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.9, delay: 0.1 + index * 0.02, ease: "easeOut" as const }}
    />
  );
}

export default function BookingSuccessModal({
  open,
  reference,
  vehicle,
  rentalDays,
  bookingDate,
  onClose,
}: BookingSuccessModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const formattedDate = bookingDate
    ? new Date(bookingDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
          onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            key="modal-card"
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, delay: 0.05 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #111010 0%, #0c0c0b 100%)",
              border: "1px solid rgba(250,204,21,0.25)",
              boxShadow: [
                "0 0 0 1px rgba(250,204,21,0.08)",
                "0 0 40px rgba(250,204,21,0.18)",
                "0 0 80px rgba(250,204,21,0.08)",
                "0 32px 64px rgba(0,0,0,0.6)",
              ].join(", "),
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(250,204,21,0.14) 0%, transparent 70%)",
              }}
            />

            <div
              className="absolute top-0 inset-x-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(250,204,21,0.6) 50%, transparent 100%)",
              }}
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10 flex flex-col items-center text-center px-8 pt-10 pb-8">
              <div className="relative mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.15 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(250,204,21,0.2) 0%, rgba(250,204,21,0.05) 70%)",
                    border: "2px solid rgba(250,204,21,0.4)",
                    boxShadow: "0 0 24px rgba(250,204,21,0.3), 0 0 48px rgba(250,204,21,0.12)",
                  }}
                >
                  <motion.svg
                    className="w-9 h-9 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" as const }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </motion.svg>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(16)].map((_, i) => (
                    <Particle key={i} index={i} />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-yellow-400/80 mb-2">
                  Booking Confirmed
                </p>
                <h2 className="text-2xl font-black text-white leading-tight mb-1">
                  You're all set!
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Our team will call you within 15 minutes to confirm your rental.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="w-full mt-6 rounded-2xl p-4 text-left"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-500 uppercase tracking-widest">Reference</span>
                  <span
                    className="font-mono text-sm font-bold text-yellow-400 px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(250,204,21,0.12)",
                      border: "1px solid rgba(250,204,21,0.2)",
                    }}
                  >
                    {reference}
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Vehicle", value: vehicle },
                    { label: "Duration", value: `${rentalDays} day${rentalDays !== 1 ? "s" : ""}` },
                    { label: "Pickup Date", value: formattedDate },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">{label}</span>
                      <span className="text-xs font-semibold text-zinc-200">{value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className="transform-gpu mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-zinc-900 transition-all duration-200 hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
                  boxShadow: "0 4px 20px rgba(250,204,21,0.3)",
                }}
              >
                Done
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-3 text-xs text-zinc-600"
              >
                Screenshot this for your records
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
