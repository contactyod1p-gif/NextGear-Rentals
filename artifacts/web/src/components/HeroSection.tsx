import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 200, damping: 20 };

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090a]">
      {/* Hero background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay to keep text readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,9,10,0.65) 0%, rgba(8,9,10,0.5) 40%, rgba(8,9,10,0.75) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400">
            Premium Vehicle Rental
          </span>
        </motion.div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          className="transform-gpu cursor-default"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
          >
            Next
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #fbbf24 100%)",
              }}
            >
              Gear
            </span>
            <br />
            Rentals
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-xl sm:text-2xl font-light text-zinc-400 tracking-wide"
        >
          Premium Fleet.{" "}
          <span className="text-white font-medium">Seamless Booking.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-xl text-sm text-zinc-500 leading-relaxed"
        >
          Hand-picked vehicles for every journey — from rugged off-road adventures to
          executive transfers. Reserve in minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#book"
            className="transform-gpu inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-bold text-zinc-900 shadow-lg shadow-yellow-400/25 transition-all duration-200 hover:bg-yellow-300 hover:shadow-yellow-400/40 hover:scale-105 active:scale-95"
          >
            Book Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#fleet"
            className="transform-gpu inline-flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-3.5 text-sm font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-white hover:scale-105 active:scale-95"
          >
            Explore Fleet
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex items-center gap-8 text-center"
        >
          {[
            { value: "50+", label: "Premium Vehicles" },
            { value: "10k+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col">
              <span className="text-2xl font-black text-yellow-400">{value}</span>
              <span className="text-xs text-zinc-500 mt-0.5 tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
