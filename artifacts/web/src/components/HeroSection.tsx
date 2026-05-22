import { motion } from "framer-motion";
import bmwHeroImg from "@assets/IMG_20260521_073658_880_1779413827658.jpg";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE =
  "Hi Baraut Self Drive Cars! I am browsing your website and would love to check the availability for renting a vehicle. Please let me know the process.";

export default function HeroSection() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bmwHeroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* Dark gradient overlay — heavy on the left for text legibility, fades right */}
      <div
        className="absolute inset-0 z-[1]"
        aria-hidden
        style={{
          background:
            "linear-gradient(105deg, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.78) 35%, rgba(5,5,8,0.40) 65%, rgba(5,5,8,0.15) 100%)",
        }}
      />

      {/* Extra bottom fade for a seamless section transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none"
        aria-hidden
        style={{
          background: "linear-gradient(to top, #08090a 0%, transparent 100%)",
        }}
      />

      {/* Content — left-aligned, padded */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32 pt-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400">
              Premium Self Drive · Baraut
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]"
          >
            Drive Premium.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #fbbf24 100%)",
              }}
            >
              Arrive Unforgettable.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed font-light max-w-lg"
          >
            Exquisite luxury and performance vehicles curated for your ultimate journey.{" "}
            <span className="text-white font-medium">Zero paperwork. Pure drive.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            {/* Primary CTA */}
            <a
              href="#fleet"
              className="group transform-gpu relative inline-flex items-center gap-2.5 rounded-full bg-yellow-400 px-8 py-4 text-sm font-bold text-zinc-900 shadow-lg shadow-yellow-400/25 transition-all duration-300 hover:bg-yellow-300 hover:shadow-yellow-400/50 hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Explore the Fleet
            </a>

            {/* Secondary text link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors duration-200"
            >
              <span className="relative">
                Book Now
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-yellow-400 transition-all duration-300 group-hover:w-full" />
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="mt-16 flex items-center gap-8"
          >
            {[
              { value: "₹1,500", label: "Starting / day" },
              { value: "4.9★", label: "Customer Rating" },
              { value: "24/7", label: "Roadside Support" },
            ].map(({ value, label }, i) => (
              <div key={label} className={`flex flex-col ${i > 0 ? "border-l border-white/10 pl-8" : ""}`}>
                <span className="text-xl sm:text-2xl font-black text-yellow-400">{value}</span>
                <span className="text-xs text-zinc-500 mt-0.5 tracking-wide uppercase">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-zinc-600">
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
