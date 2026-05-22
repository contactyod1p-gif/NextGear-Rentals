import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

import tharImg from "@assets/TharSoloSM24_1779414742860.jpg";
import tuv300Img from "@assets/vel-car-s-namakkal-bazaar-namakkal-second-hand-car-dealers-fok_1779414742807.jpg";
import ninjaImg from "@assets/photo-1470945780341-171b6da56841_1779414742891.jpeg";

const WHATSAPP_NUMBER = "918135829196";

function buildQuickBookUrl(vehicleName: string, price: number): string {
  const message = `Hi Baraut Self Drive Cars! I am interested in booking the *${vehicleName}* at ₹${price.toLocaleString("en-IN")}/day. Please let me know the availability and booking process.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Category = "All" | "SUVs" | "Bikes";

interface Spec {
  icon: string;
  label: string;
  value: string;
}

interface Vehicle {
  name: string;
  subtitle: string;
  category: Category;
  pricePerDay: number;
  badge: string;
  badgeStyle: string;
  cardBg: string;
  accentColor: string;
  accentHex: string;
  borderHover: string;
  imageSrc: string;
  specs: Spec[];
  perks: string[];
}

const FLEET: Vehicle[] = [
  {
    name: "Mahindra Thar 4x4",
    subtitle: "Off-Road SUV",
    category: "SUVs",
    pricePerDay: 4500,
    badge: "MOST POPULAR",
    badgeStyle: "text-amber-400 border-amber-400/40 bg-amber-400/10",
    cardBg: "rgba(120,53,15,0.08)",
    accentColor: "text-amber-400",
    accentHex: "#fbbf24",
    borderHover: "hover:border-amber-400/40",
    imageSrc: tharImg,
    specs: [
      { icon: "👤", label: "Seats", value: "4" },
      { icon: "⛽", label: "Fuel", value: "Diesel" },
      { icon: "⚙️", label: "Trans", value: "Manual" },
    ],
    perks: ["4x4 Drive", "Off-Road Ready", "Convertible Top", "Bluetooth"],
  },
  {
    name: "Mahindra TUV300",
    subtitle: "Family SUV",
    category: "SUVs",
    pricePerDay: 3200,
    badge: "FAMILY PICK",
    badgeStyle: "text-blue-400 border-blue-400/40 bg-blue-400/10",
    cardBg: "rgba(30,58,138,0.08)",
    accentColor: "text-blue-400",
    accentHex: "#60a5fa",
    borderHover: "hover:border-blue-400/40",
    imageSrc: tuv300Img,
    specs: [
      { icon: "👤", label: "Seats", value: "7" },
      { icon: "⛽", label: "Fuel", value: "Diesel" },
      { icon: "⚙️", label: "Trans", value: "Manual" },
    ],
    perks: ["7 Seater", "Spacious Boot", "AC", "Roof Carrier"],
  },
  {
    name: "Kawasaki Ninja",
    subtitle: "Superbike",
    category: "Bikes",
    pricePerDay: 6000,
    badge: "TRACK READY",
    badgeStyle: "text-rose-400 border-rose-400/40 bg-rose-400/10",
    cardBg: "rgba(17,17,27,0.6)",
    accentColor: "text-rose-400",
    accentHex: "#fb7185",
    borderHover: "hover:border-rose-400/40",
    imageSrc: ninjaImg,
    specs: [
      { icon: "👤", label: "Seats", value: "2" },
      { icon: "⛽", label: "Fuel", value: "Petrol" },
      { icon: "🏎️", label: "Engine", value: "1000cc" },
    ],
    perks: ["Superbike", "Sport Mode", "Disc Brakes", "Manual Trans"],
  },
];

const FILTERS: Category[] = ["All", "SUVs", "Bikes"];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

/* ─── Skeleton Card ─────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden flex flex-col animate-pulse">
      {/* Image placeholder */}
      <div className="h-52 bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%] animate-shimmer shrink-0" />
      <div className="p-5 flex flex-col gap-4">
        {/* Title lines */}
        <div className="flex flex-col gap-2">
          <div className="h-2.5 w-16 rounded-full bg-white/10" />
          <div className="h-5 w-40 rounded-lg bg-white/10" />
        </div>
        {/* Spec chips */}
        <div className="flex gap-2">
          {[56, 64, 60].map((w) => (
            <div key={w} className="h-10 rounded-lg bg-white/6" style={{ width: w }} />
          ))}
        </div>
        {/* Perk pills */}
        <div className="flex flex-wrap gap-1.5">
          {[48, 72, 56, 64].map((w) => (
            <div key={w} className="h-6 rounded-full bg-white/6" style={{ width: w }} />
          ))}
        </div>
        {/* CTA button */}
        <div className="mt-auto h-11 rounded-xl bg-white/8" />
      </div>
    </div>
  );
}

/* ─── Vehicle Card ──────────────────────────────────────────────────── */
function VehicleCard({
  vehicle,
  index,
  onBook,
}: {
  vehicle: Vehicle;
  index: number;
  onBook: (name: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="group h-full"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        animate={{ y: hovered ? -6 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl border border-white/8 overflow-hidden h-full flex flex-col transition-[border-color,box-shadow] duration-300 ${vehicle.borderHover}`}
        style={{
          background: `linear-gradient(160deg, ${vehicle.cardBg} 0%, rgba(8,9,10,0.95) 60%)`,
          boxShadow: hovered
            ? `0 12px 48px ${vehicle.accentHex}18, 0 2px 0 rgba(255,255,255,0.04) inset`
            : "0 2px 0 rgba(255,255,255,0.03) inset",
        }}
      >
        {/* Accent glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 rounded-2xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(ellipse 80% 55% at 0% 0%, ${vehicle.accentHex}10 0%, transparent 70%)`,
          }}
        />

        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden shrink-0 bg-zinc-950">
          <img
            src={vehicle.imageSrc}
            alt={vehicle.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center opacity-90 transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/25 to-transparent" />

          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-black uppercase tracking-widest border rounded-full px-3 py-1.5 backdrop-blur-sm ${vehicle.badgeStyle}`}>
              {vehicle.badge}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 z-10">
            <div className="flex items-baseline gap-0.5 rounded-xl bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1.5">
              <span className="text-base font-black text-yellow-400">
                ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-zinc-400">/day</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative z-10 p-5 flex flex-col flex-1 gap-4">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5 ${vehicle.accentColor}`}>
              {vehicle.subtitle}
            </p>
            <h3 className="text-xl font-black text-white leading-tight">{vehicle.name}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {vehicle.specs.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 rounded-lg border border-white/8 bg-white/[0.04] px-3 py-1.5">
                <span className="text-sm leading-none">{s.icon}</span>
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase tracking-widest leading-none mb-0.5">{s.label}</p>
                  <p className="text-xs font-semibold text-zinc-200 leading-none">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 flex-1">
            {vehicle.perks.map((p) => (
              <span key={p} className="text-[11px] text-zinc-400 bg-white/[0.04] border border-white/8 rounded-full px-2.5 py-1 leading-none">
                {p}
              </span>
            ))}
          </div>

          {/* CTA — fires toast + opens WhatsApp */}
          <a
            href={buildQuickBookUrl(vehicle.name, vehicle.pricePerDay)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onBook(vehicle.name)}
            className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
            style={{
              background: "linear-gradient(135deg, #facc15 0%, #d97706 100%)",
              boxShadow: "0 4px 16px rgba(250,204,21,0.25)",
              color: "#09090b",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 shrink-0" fill="#09090b">
              <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
            </svg>
            Book Now on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Fleet Section ─────────────────────────────────────────────────── */
export default function FleetSection() {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = activeFilter === "All"
    ? FLEET
    : FLEET.filter((v) => v.category === activeFilter);

  function handleBook(vehicleName: string) {
    toast({
      title: "Reservation request sent!",
      description: `${vehicleName} added to your reservation. Opening WhatsApp to confirm…`,
      duration: 4000,
    });
  }

  return (
    <section id="fleet" className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(250,204,21,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            Our Fleet
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Choose Your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Adventure
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            From rugged off-road terrains to smooth highway cruising, pick the perfect ride for your journey.
            Every vehicle is sanitized, insured, and roadside-assist ready.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                activeFilter === f
                  ? "bg-yellow-400 text-zinc-900 shadow-lg shadow-yellow-400/25"
                  : "border border-white/10 text-zinc-400 bg-white/[0.03] hover:border-white/20 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid — skeleton or real cards */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((vehicle, i) => (
                <VehicleCard
                  key={vehicle.name}
                  vehicle={vehicle}
                  index={i}
                  onBook={handleBook}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
