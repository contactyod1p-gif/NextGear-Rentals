import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";

const VEHICLES = [
  {
    name: "Mahindra Thar 4x4",
    category: "Off-Road SUV",
    pricePerDay: 4500,
    fuel: "Diesel",
    transmission: "Manual",
    accent: "#fbbf24",
    emoji: "🏔️",
    perks: ["4x4 Drive", "Off-Road Ready", "Convertible Top"],
  },
  {
    name: "Mahindra TUV300",
    category: "Family SUV",
    pricePerDay: 3200,
    fuel: "Diesel",
    transmission: "Manual",
    accent: "#60a5fa",
    emoji: "👨‍👩‍👧‍👦",
    perks: ["7 Seater", "Spacious Boot", "Roof Carrier"],
  },
  {
    name: "Kawasaki Ninja",
    category: "Superbike",
    pricePerDay: 6000,
    fuel: "Petrol",
    transmission: "Manual",
    accent: "#fb7185",
    emoji: "🏍️",
    perks: ["1000cc", "Sport Mode", "Disc Brakes"],
  },
];

const DAY_PRESETS = [1, 3, 5, 7, 14, 30];

function formatINR(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function PricingCalculator() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [days, setDays] = useState(3);
  const [inputDays, setInputDays] = useState("3");

  const vehicle = VEHICLES[selectedIdx];
  const total = vehicle.pricePerDay * days;

  const whatsappMsg = `Hi Baraut Self Drive Cars! I'd like to book the *${vehicle.name}* for *${days} day${days !== 1 ? "s" : ""}*. Estimated total: *${formatINR(total)}*. Please confirm availability.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  function handleDayInput(val: string) {
    setInputDays(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 1 && n <= 90) setDays(n);
  }

  function handlePreset(d: number) {
    setDays(d);
    setInputDays(String(d));
  }

  return (
    <section className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(250,204,21,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            Pricing Calculator
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Know Your Cost{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Instantly
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
            Pick a car, choose how many days, and see your total — with zero hidden charges.
            What you see here is exactly what you pay.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* LEFT — Vehicle picker */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 pl-1">
              1. Choose Your Vehicle
            </p>
            {VEHICLES.map((v, i) => (
              <button
                key={v.name}
                onClick={() => setSelectedIdx(i)}
                className={`w-full text-left rounded-2xl border transition-all duration-200 p-4 flex items-center gap-4 group ${
                  selectedIdx === i
                    ? "border-white/20 bg-white/[0.06]"
                    : "border-white/6 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.04]"
                }`}
                style={
                  selectedIdx === i
                    ? { boxShadow: `0 0 0 1px ${v.accent}30, 0 4px 24px ${v.accent}10` }
                    : {}
                }
              >
                {/* Emoji icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-200 group-hover:scale-105"
                  style={{
                    background: `${v.accent}15`,
                    border: `1px solid ${v.accent}25`,
                  }}
                >
                  {v.emoji}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white truncate">{v.name}</p>
                    {selectedIdx === i && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 shrink-0"
                        style={{ background: `${v.accent}20`, color: v.accent, border: `1px solid ${v.accent}30` }}
                      >
                        Selected
                      </motion.span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{v.category} · {v.fuel} · {v.transmission}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {v.perks.map((p) => (
                      <span key={p} className="text-[10px] text-zinc-500 bg-white/4 border border-white/6 rounded-full px-2 py-0.5">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right">
                  <p className="text-lg font-black" style={{ color: v.accent }}>
                    {formatINR(v.pricePerDay)}
                  </p>
                  <p className="text-xs text-zinc-600">/ day</p>
                </div>
              </button>
            ))}
          </motion.div>

          {/* RIGHT — Days picker + result */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Days section */}
            <div
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-5">
                2. How Many Days?
              </p>

              {/* Preset chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {DAY_PRESETS.map((d) => (
                  <button
                    key={d}
                    onClick={() => handlePreset(d)}
                    className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                      days === d
                        ? "bg-yellow-400 text-zinc-900 shadow-lg shadow-yellow-400/20"
                        : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white bg-white/4"
                    }`}
                  >
                    {d} {d === 1 ? "day" : "days"}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={inputDays}
                    onChange={(e) => handleDayInput(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/15 pr-14"
                    placeholder="Custom days..."
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                    days
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handlePreset(Math.min(days + 1, 90))}
                    className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handlePreset(Math.max(days - 1, 1))}
                    className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Total cost card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${vehicle.name}-${days}`}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-2xl border p-6 relative overflow-hidden"
                style={{
                  borderColor: `${vehicle.accent}30`,
                  background: `linear-gradient(135deg, ${vehicle.accent}08 0%, rgba(255,255,255,0.02) 100%)`,
                  boxShadow: `0 0 40px ${vehicle.accent}10`,
                }}
              >
                {/* Decorative glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: `${vehicle.accent}12`, filter: "blur(32px)" }}
                />

                <div className="relative z-10">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
                    3. Your Estimate
                  </p>

                  {/* Breakdown */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{vehicle.name}</span>
                      <span className="text-zinc-300 font-medium">{formatINR(vehicle.pricePerDay)} / day</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Duration</span>
                      <span className="text-zinc-300 font-medium">{days} day{days !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="border-t border-white/8 pt-2 flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Taxes & fees</span>
                      <span className="text-green-400 font-semibold text-xs">Included ✓</span>
                    </div>
                    <div className="border-t border-white/8 pt-2 flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Hidden charges</span>
                      <span className="text-green-400 font-semibold text-xs">Zero ✓</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div
                    className="rounded-xl p-4 mb-5 flex items-center justify-between"
                    style={{ background: `${vehicle.accent}10`, border: `1px solid ${vehicle.accent}20` }}
                  >
                    <div>
                      <p className="text-xs text-zinc-500 mb-0.5 uppercase tracking-widest font-semibold">Total</p>
                      <p className="text-4xl font-black" style={{ color: vehicle.accent }}>
                        {formatINR(total)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500">
                        {formatINR(vehicle.pricePerDay)}
                        <span className="text-zinc-600"> × {days}d</span>
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5">No upfront payment</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full rounded-xl py-4 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #25d366 0%, #128c4a 100%)",
                      boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-white shrink-0">
                      <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
                    </svg>
                    Book {vehicle.name.split(" ").slice(0,2).join(" ")} for {formatINR(total)}
                  </a>

                  <p className="mt-3 text-center text-xs text-zinc-600">
                    Sends a pre-filled WhatsApp message · Confirm in minutes
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
