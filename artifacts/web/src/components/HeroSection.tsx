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

function CarSVG() {
  return (
    <svg
      viewBox="0 0 320 110"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ filter: "drop-shadow(0 8px 24px rgba(250,204,21,0.25))" }}
    >
      <defs>
        <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="60%" stopColor="#111" />
          <stop offset="100%" stopColor="#333" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f2440" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Car shadow */}
      <ellipse cx="160" cy="104" rx="130" ry="6" fill="rgba(0,0,0,0.5)" />

      {/* Body */}
      <rect x="30" y="52" width="260" height="44" rx="10" fill="url(#bodyGrad)" />

      {/* Roof / cabin */}
      <path d="M88 52 L108 14 L210 14 L232 52 Z" fill="url(#roofGrad)" />

      {/* Roof highlight */}
      <path d="M100 50 L117 18 L200 18 L218 50 Z" fill="rgba(255,255,255,0.03)" />

      {/* Rear window */}
      <path d="M93 50 L111 17 L140 17 L140 50 Z" fill="url(#glassGrad)" rx="3" />
      {/* Rear window shine */}
      <path d="M97 46 L112 22 L122 22 L110 46 Z" fill="rgba(255,255,255,0.08)" />

      {/* Front window */}
      <path d="M143 50 L143 17 L208 17 L228 50 Z" fill="url(#glassGrad)" />
      {/* Front window shine */}
      <path d="M148 46 L148 22 L170 22 L170 46 Z" fill="rgba(255,255,255,0.08)" />

      {/* Window divider (B pillar) */}
      <rect x="140" y="14" width="4" height="38" fill="#111" />

      {/* Front bumper */}
      <path d="M280 65 L294 70 L294 82 L278 86 Z" fill="#facc15" rx="3" />
      {/* Front grille */}
      <rect x="280" y="68" width="10" height="14" rx="2" fill="#0a0a0a" />
      {/* Headlight */}
      <path d="M272 56 L290 60 L290 67 L270 65 Z" fill="#facc15" opacity="0.9" />
      {/* Headlight glow */}
      <ellipse cx="290" cy="63" rx="6" ry="4" fill="#facc15" opacity="0.4" />

      {/* Rear taillight */}
      <rect x="30" y="58" width="12" height="18" rx="3" fill="#ef4444" opacity="0.9" />
      <rect x="30" y="58" width="6" height="18" rx="3" fill="#fca5a5" opacity="0.5" />

      {/* Side accent stripe */}
      <rect x="30" y="74" width="260" height="3" rx="1.5" fill="#facc15" opacity="0.6" />

      {/* Door lines */}
      <line x1="155" y1="54" x2="155" y2="94" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
      <line x1="215" y1="54" x2="215" y2="94" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />

      {/* Door handles */}
      <rect x="162" y="70" width="16" height="4" rx="2" fill="#facc15" opacity="0.7" />
      <rect x="222" y="70" width="16" height="4" rx="2" fill="#facc15" opacity="0.7" />

      {/* Rear wheel arch */}
      <path d="M52 96 Q52 56 92 56 Q132 56 132 96 Z" fill="#111" />
      {/* Front wheel arch */}
      <path d="M178 96 Q178 56 218 56 Q258 56 258 96 Z" fill="#111" />

      {/* Rear wheel */}
      <motion.g
        style={{ originX: "92px", originY: "90px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      >
        <circle cx="92" cy="90" r="22" fill="url(#wheelGrad)" />
        <circle cx="92" cy="90" r="14" fill="#1a1a1a" />
        <line x1="92" y1="76" x2="92" y2="104" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        <line x1="78" y1="90" x2="106" y2="90" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        <line x1="82" y1="80" x2="102" y2="100" stroke="#555" strokeWidth="2" strokeLinecap="round" />
        <line x1="82" y1="100" x2="102" y2="80" stroke="#555" strokeWidth="2" strokeLinecap="round" />
        <circle cx="92" cy="90" r="6" fill="#333" />
      </motion.g>

      {/* Front wheel */}
      <motion.g
        style={{ originX: "218px", originY: "90px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
      >
        <circle cx="218" cy="90" r="22" fill="url(#wheelGrad)" />
        <circle cx="218" cy="90" r="14" fill="#1a1a1a" />
        <line x1="218" y1="76" x2="218" y2="104" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        <line x1="204" y1="90" x2="232" y2="90" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        <line x1="208" y1="80" x2="228" y2="100" stroke="#555" strokeWidth="2" strokeLinecap="round" />
        <line x1="208" y1="100" x2="228" y2="80" stroke="#555" strokeWidth="2" strokeLinecap="round" />
        <circle cx="218" cy="90" r="6" fill="#333" />
      </motion.g>

      {/* Tyre contact patches */}
      <ellipse cx="92" cy="112" rx="18" ry="3" fill="rgba(0,0,0,0.4)" />
      <ellipse cx="218" cy="112" rx="18" ry="3" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

function RunningCarScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none">
      {/* Road surface */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(8,9,10,0.7) 60%, transparent 100%)",
        }}
      />

      {/* Road centre dashes — moving to simulate forward motion */}
      <div className="absolute bottom-8 left-0 right-0 h-px overflow-hidden">
        <motion.div
          className="flex gap-0 absolute top-0"
          style={{ width: "400%" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              style={{ width: 60, height: 2, marginRight: 40, flexShrink: 0 }}
              className="bg-yellow-400/40 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Speed lines behind the car */}
      <motion.div
        className="absolute bottom-14 flex flex-col gap-1.5"
        animate={{ x: ["0%", "200%"] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        style={{ left: "-20%", width: "30%" }}
      >
        {[80, 60, 90, 50, 70].map((w, i) => (
          <div
            key={i}
            className="rounded-full bg-yellow-400/20"
            style={{ height: 1.5, width: `${w}%`, marginLeft: `${100 - w}%` }}
          />
        ))}
      </motion.div>

      {/* The car — drives continuously from right to left */}
      <motion.div
        className="absolute bottom-10"
        style={{ width: 280 }}
        animate={{ x: ["105vw", "-340px"] }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "linear",
          repeatDelay: 0.5,
        }}
      >
        <CarSVG />
      </motion.div>
    </div>
  );
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
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090a] transform-gpu"
      style={{ willChange: "transform" }}
    >
      {/* ── Cinematic video background ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu"
        style={{ willChange: "transform" }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/videos/hero-car-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — ensures AAA contrast for all text and the booking widget */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{ background: "rgba(8,9,10,0.62)" }}
      />

      {/* Subtle golden glow accents over the overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(250,204,21,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(250,204,21,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Animated car running scene — z-[3] sits above video + overlays */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <RunningCarScene />
      </div>

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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 z-10">
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
