import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE =
  "Hi Baraut Self Drive Cars! I am browsing your website and would love to check the availability for renting a vehicle. Please let me know the process.";

function shouldSkipVideo(): boolean {
  try {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (!conn) return false;
    if (conn.saveData) return true;
    return conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
  } catch {
    return false;
  }
}

const SPRING = { stiffness: 200, damping: 20 };

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
      <ellipse cx="160" cy="104" rx="130" ry="6" fill="rgba(0,0,0,0.5)" />
      <rect x="30" y="52" width="260" height="44" rx="10" fill="url(#bodyGrad)" />
      <path d="M88 52 L108 14 L210 14 L232 52 Z" fill="url(#roofGrad)" />
      <path d="M100 50 L117 18 L200 18 L218 50 Z" fill="rgba(255,255,255,0.03)" />
      <path d="M93 50 L111 17 L140 17 L140 50 Z" fill="url(#glassGrad)" />
      <path d="M97 46 L112 22 L122 22 L110 46 Z" fill="rgba(255,255,255,0.08)" />
      <path d="M143 50 L143 17 L208 17 L228 50 Z" fill="url(#glassGrad)" />
      <path d="M148 46 L148 22 L170 22 L170 46 Z" fill="rgba(255,255,255,0.08)" />
      <rect x="140" y="14" width="4" height="38" fill="#111" />
      <path d="M280 65 L294 70 L294 82 L278 86 Z" fill="#facc15" />
      <rect x="280" y="68" width="10" height="14" rx="2" fill="#0a0a0a" />
      <path d="M272 56 L290 60 L290 67 L270 65 Z" fill="#facc15" opacity="0.9" />
      <ellipse cx="290" cy="63" rx="6" ry="4" fill="#facc15" opacity="0.4" />
      <rect x="30" y="58" width="12" height="18" rx="3" fill="#ef4444" opacity="0.9" />
      <rect x="30" y="58" width="6" height="18" rx="3" fill="#fca5a5" opacity="0.5" />
      <rect x="30" y="74" width="260" height="3" rx="1.5" fill="#facc15" opacity="0.6" />
      <line x1="155" y1="54" x2="155" y2="94" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
      <line x1="215" y1="54" x2="215" y2="94" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
      <rect x="162" y="70" width="16" height="4" rx="2" fill="#facc15" opacity="0.7" />
      <rect x="222" y="70" width="16" height="4" rx="2" fill="#facc15" opacity="0.7" />
      <path d="M52 96 Q52 56 92 56 Q132 56 132 96 Z" fill="#111" />
      <path d="M178 96 Q178 56 218 56 Q258 56 258 96 Z" fill="#111" />
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
      <ellipse cx="92" cy="112" rx="18" ry="3" fill="rgba(0,0,0,0.4)" />
      <ellipse cx="218" cy="112" rx="18" ry="3" fill="rgba(0,0,0,0.4)" />
    </svg>
  );
}

function RunningCarScene() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none">
      <div
        className="absolute bottom-0 left-0 right-0 h-28"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(8,9,10,0.7) 60%, transparent 100%)",
        }}
      />
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
      <motion.div
        className="absolute bottom-10"
        style={{ width: 280 }}
        animate={{ x: ["105vw", "-340px"] }}
        transition={{ repeat: Infinity, duration: 7, ease: "linear", repeatDelay: 0.5 }}
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

  const skipVideo = shouldSkipVideo();
  const [videoLoaded, setVideoLoaded] = useState(() => skipVideo);

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

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

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090a] transform-gpu"
      style={{ willChange: "transform" }}
    >
      {/* Poster skeleton */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-in-out ${videoLoaded ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Video background */}
      {!skipVideo && (
        <video
          className={`absolute inset-0 w-full h-full object-cover z-0 transform-gpu transition-opacity duration-700 ease-in-out ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ willChange: "transform" }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoaded}
          aria-hidden
        >
          <source src="/videos/baraut-hero-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
        style={{ background: "rgba(8,9,10,0.62)" }}
      />

      {/* Golden glow accents */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(250,204,21,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 80%, rgba(250,204,21,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Animated car running scene */}
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
            Premium Self Drive Cars in Baraut
          </span>
        </motion.div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
          className="transform-gpu cursor-default"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none"
          >
            Premium Self Drive
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 50%, #fbbf24 100%)",
              }}
            >
              Cars in Baraut
            </span>
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 text-xl sm:text-2xl font-light text-zinc-400 tracking-wide"
        >
          Luxury Fleet.{" "}
          <span className="text-white font-medium">Zero Paperwork. Drive Free.</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 max-w-xl text-sm text-zinc-400 leading-relaxed"
        >
          Hand-picked, sanitized vehicles for every journey — from luxury sedans to rugged 4x4s.
          Upload your ID, verify, and drive. No hidden charges, ever.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#fleet"
            className="transform-gpu inline-flex items-center gap-2 rounded-full border-2 border-yellow-400 bg-yellow-400/10 px-8 py-4 text-base font-bold text-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 transition-all duration-200 hover:scale-105 active:scale-95 min-w-[180px] justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Fleet
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transform-gpu inline-flex items-center gap-2 rounded-full bg-[#25d366] hover:bg-[#1ebe5a] px-8 py-4 text-base font-bold text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-green-500/40 min-w-[220px] justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-white">
              <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm0 24.267a11.04 11.04 0 01-5.63-1.543l-.404-.24-4.142 1.075 1.107-4.019-.264-.42A10.977 10.977 0 015.003 16c0-6.07 4.933-11.003 11-11.003S27.003 9.93 27.003 16s-4.93 11.003-11 10.934zm6.04-8.232c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
            </svg>
            Book Now (WhatsApp)
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 flex items-center gap-8 text-center"
        >
          {[
            { value: "4+", label: "Premium Vehicles" },
            { value: "500+", label: "Happy Customers" },
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
