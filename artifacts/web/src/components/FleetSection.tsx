import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Vehicle {
  name: string;
  category: string;
  pricePerDay: number;
  seats: number;
  fuel: string;
  transmission: string;
  features: string[];
  badge?: string;
  gradient: string;
  icon: string;
}

const FLEET: Vehicle[] = [
  {
    name: "Mahindra Thar",
    category: "Off-Road SUV",
    pricePerDay: 4500,
    seats: 4,
    fuel: "Diesel",
    transmission: "Manual",
    features: ["4x4 Drive", "Convertible Top", "Off-Road Ready", "Bluetooth"],
    badge: "Most Popular",
    gradient: "from-amber-900/40 to-orange-950/60",
    icon: "🚙",
  },
  {
    name: "Toyota Innova",
    category: "Premium MPV",
    pricePerDay: 3800,
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    features: ["7 Seater", "Captain Seats", "Sunroof", "360° Camera"],
    badge: "Family Pick",
    gradient: "from-blue-900/40 to-indigo-950/60",
    icon: "🚐",
  },
  {
    name: "Hyundai Creta",
    category: "Compact SUV",
    pricePerDay: 2800,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Sunroof", "Ventilated Seats", "Lane Assist", "Wireless Carplay"],
    gradient: "from-violet-900/40 to-purple-950/60",
    icon: "🚗",
  },
  {
    name: "Toyota Fortuner",
    category: "Full-Size SUV",
    pricePerDay: 6500,
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    features: ["4x4 Drive", "Premium Audio", "Dual Zone AC", "Hill Descent"],
    badge: "Executive",
    gradient: "from-zinc-800/60 to-slate-900/60",
    icon: "🛻",
  },
  {
    name: "Mercedes GLC",
    category: "Luxury SUV",
    pricePerDay: 12000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Burmester Audio", "Massage Seats", "Head-Up Display", "Ambient Lighting"],
    badge: "Luxury",
    gradient: "from-yellow-900/30 to-amber-950/50",
    icon: "⭐",
  },
  {
    name: "Kia Carens",
    category: "6-Seat MPV",
    pricePerDay: 3200,
    seats: 6,
    fuel: "Diesel",
    transmission: "Automatic",
    features: ["6 Seater", "Level 2 ADAS", "Panoramic Sunroof", "Voice Control"],
    gradient: "from-teal-900/40 to-emerald-950/60",
    icon: "🚌",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="transform-gpu"
    >
      <motion.div
        animate={{ y: hovered ? -6 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl border border-white/8 bg-gradient-to-br ${vehicle.gradient} backdrop-blur-sm overflow-hidden cursor-pointer h-full`}
        style={{ background: `linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)` }}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vehicle.gradient}`} />

        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "linear-gradient(135deg, rgba(234,179,8,0.08) 0%, transparent 60%)",
            boxShadow: "inset 0 0 40px rgba(234,179,8,0.06)",
          }}
        />

        <div className="relative z-10 p-6 flex flex-col h-full">
          {vehicle.badge && (
            <div className="absolute top-4 right-4">
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-400 border border-yellow-400/40 bg-yellow-400/10 rounded-full px-2.5 py-1">
                {vehicle.badge}
              </span>
            </div>
          )}

          <div className="flex items-start gap-4 mb-5">
            <div className="text-4xl leading-none">{vehicle.icon}</div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-0.5">
                {vehicle.category}
              </p>
              <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
            </div>
          </div>

          <div className="h-28 rounded-xl bg-white/4 border border-white/6 mb-5 flex items-center justify-center overflow-hidden">
            <div className="text-6xl opacity-20 select-none">{vehicle.icon}</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-zinc-600 text-xs tracking-widest uppercase">Vehicle Preview</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              { label: "Seats", value: `${vehicle.seats}` },
              { label: "Fuel", value: vehicle.fuel },
              { label: "Trans.", value: vehicle.transmission.slice(0, 4) + "." },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-white/5 border border-white/6 px-2 py-2 text-center">
                <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
                <p className="text-xs font-semibold text-zinc-200">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
            {vehicle.features.map((f) => (
              <span
                key={f}
                className="text-xs text-zinc-400 bg-white/5 border border-white/8 rounded-full px-2.5 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/8">
            <div>
              <p className="text-xs text-zinc-500 mb-0.5">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-yellow-400">
                  ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-zinc-500">/day</span>
              </div>
            </div>
            <a
              href="#book"
              className="transform-gpu text-xs font-bold text-zinc-900 bg-yellow-400 hover:bg-yellow-300 transition-colors rounded-full px-4 py-2"
            >
              Book Now
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FleetSection() {
  return (
    <section id="fleet" className="bg-[#08090a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            Our Fleet
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Hand-Picked{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)",
              }}
            >
              Premium
            </span>{" "}
            Vehicles
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            From rugged off-roaders to luxury SUVs — every vehicle is maintained to
            showroom standards, fully insured, and roadside-assist ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FLEET.map((vehicle, i) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
