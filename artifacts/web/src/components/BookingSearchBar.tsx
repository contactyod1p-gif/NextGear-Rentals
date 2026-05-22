import { useState } from "react";
import { motion } from "framer-motion";

const LOCATIONS = [
  "Baraut, UP",
  "Meerut, UP",
  "Ghaziabad, UP",
  "Delhi NCR",
  "Muzaffarnagar, UP",
  "Shamli, UP",
];

const WHATSAPP_NUMBER = "918135829196";

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function addDays(base: string, n: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}

export default function BookingSearchBar() {
  const today = todayStr();
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [pickupDate, setPickupDate] = useState(today);
  const [dropoffDate, setDropoffDate] = useState(addDays(today, 3));

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const days =
      Math.max(
        1,
        Math.round(
          (new Date(dropoffDate).getTime() - new Date(pickupDate).getTime()) /
            86_400_000
        )
      );
    const msg = `Hi Baraut Self Drive Cars! I'd like to search for available vehicles.\n\n📍 Pick-up: *${location}*\n📅 From: *${pickupDate}*\n📅 To: *${dropoffDate}* (${days} day${days !== 1 ? "s" : ""})\n\nPlease share what's available.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section className="bg-[#08090a] px-6 pb-2 -mt-6 relative z-30">
      <div className="max-w-5xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          onSubmit={handleSearch}
          className="relative rounded-2xl border border-white/10 bg-[#111114] shadow-2xl shadow-black/60 overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 24px 64px rgba(0,0,0,0.7)" }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #facc15 0%, #f59e0b 50%, transparent 100%)" }}
          />

          <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-white/6">
            {/* Pick-up Location */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4 group">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
                  Pick-up Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-white outline-none cursor-pointer appearance-none w-full truncate"
                  style={{ WebkitAppearance: "none" }}
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l} className="bg-[#111114] text-white">
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <svg className="w-3.5 h-3.5 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Pick-up Date */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    if (e.target.value >= dropoffDate) {
                      setDropoffDate(addDays(e.target.value, 1));
                    }
                  }}
                  className="bg-transparent text-sm font-semibold text-white outline-none w-full [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Drop-off Date */}
            <div className="flex-1 flex items-center gap-3 px-5 py-4">
              <div className="shrink-0 w-9 h-9 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
                  Drop-off Date
                </label>
                <input
                  type="date"
                  value={dropoffDate}
                  min={addDays(pickupDate, 1)}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  className="bg-transparent text-sm font-semibold text-white outline-none w-full [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-center px-4 py-3 md:py-0">
              <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-black text-zinc-900 transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
                  boxShadow: "0 4px 20px rgba(250,204,21,0.3)",
                }}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Vehicles
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
