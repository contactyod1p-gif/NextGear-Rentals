import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 200, damping: 20 };

const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Jaipur",
  "Goa",
  "Manali",
  "Leh",
  "Guwahati",
  "Jorhat",
] as const;

function getTodayLocal() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getTomorrowLocal() {
  const d = new Date(Date.now() + 86400000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const [city, setCity] = useState("");
  const [pickupTime, setPickupTime] = useState(getTodayLocal);
  const [dropoffTime, setDropoffTime] = useState(getTomorrowLocal);

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
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
            "linear-gradient(to bottom, rgba(8,9,10,0.65) 0%, rgba(8,9,10,0.5) 40%, rgba(8,9,10,0.80) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 py-24 max-w-5xl mx-auto w-full">
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
          className="mt-4 max-w-xl text-sm text-zinc-400 leading-relaxed"
        >
          Hand-picked vehicles for every journey — from rugged off-road adventures to
          executive transfers. Reserve in minutes.
        </motion.p>

        {/* ── Horizontal Search Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 w-full max-w-4xl"
        >
          <form
            onSubmit={handleSearch}
            className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-2 shadow-2xl"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset" }}
          >
            <div className="flex flex-col lg:flex-row items-stretch gap-1">

              {/* City */}
              <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors group">
                <div className="shrink-0 text-yellow-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">City</p>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer appearance-none"
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-400">Select city…</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c} className="bg-zinc-900 text-white">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-white/10 my-2" />

              {/* Pick-up */}
              <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors group">
                <div className="shrink-0 text-yellow-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Pick-up</p>
                  <input
                    type="datetime-local"
                    value={pickupTime}
                    min={getTodayLocal()}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px bg-white/10 my-2" />

              {/* Drop-off */}
              <div className="flex-1 flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 hover:bg-white/8 transition-colors group">
                <div className="shrink-0 text-yellow-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">Drop-off</p>
                  <input
                    type="datetime-local"
                    value={dropoffTime}
                    min={pickupTime}
                    onChange={(e) => setDropoffTime(e.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none cursor-pointer [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="transform-gpu shrink-0 rounded-xl bg-yellow-400 px-7 py-3 text-sm font-bold text-zinc-900 shadow-lg shadow-yellow-400/20 transition-all duration-200 hover:bg-yellow-300 hover:shadow-yellow-400/40 hover:scale-[1.02] active:scale-95 lg:self-auto self-stretch"
              >
                Search Vehicles
              </button>
            </div>
          </form>

          {/* Explore Fleet link below widget */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-4 text-center text-xs text-zinc-500"
          >
            or{" "}
            <a href="#fleet" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
              browse our fleet
            </a>{" "}
            to pick your ride first
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 flex items-center gap-8 text-center"
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
