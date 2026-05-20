import { motion } from "framer-motion";
import { useState } from "react";

import tharImg from "@assets/Screenshot_2026-05-20-07-31-20-422_com.instagram.android-edit_1779244183402.jpg";
import innovaImg from "@assets/Screenshot_2026-05-20-07-30-57-238_com.instagram.android-edit_1779244183441.jpg";
import cretaImg from "@assets/Screenshot_2026-05-20-07-31-45-608_com.instagram.android-edit_1779244183373.jpg";
import fortunerImg from "@assets/Screenshot_2026-05-20-07-29-07-167_com.instagram.android-edit_1779244183462.jpg";
import glcImg from "@assets/Screenshot_2026-05-20-07-32-05-692_com.instagram.android-edit_1779244183346.jpg";
import carensImg from "@assets/Screenshot_2026-05-20-07-31-10-380_com.instagram.android-edit_1779244183422.jpg";

interface Vehicle {
  name: string;
  category: string;
  pricePerDay: number;
  seats: number;
  fuel: string;
  transmission: string;
  features: string[];
  badge?: string;
  accentColor: string;
  image: string;
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
    accentColor: "amber",
    image: tharImg,
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
    accentColor: "blue",
    image: innovaImg,
  },
  {
    name: "Hyundai Creta",
    category: "Compact SUV",
    pricePerDay: 2800,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Sunroof", "Ventilated Seats", "Lane Assist", "Wireless Carplay"],
    accentColor: "violet",
    image: cretaImg,
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
    accentColor: "zinc",
    image: fortunerImg,
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
    accentColor: "yellow",
    image: glcImg,
  },
  {
    name: "Kia Carens",
    category: "6-Seat MPV",
    pricePerDay: 3200,
    seats: 6,
    fuel: "Diesel",
    transmission: "Automatic",
    features: ["6 Seater", "Level 2 ADAS", "Panoramic Sunroof", "Voice Control"],
    accentColor: "teal",
    image: carensImg,
  },
];

const ACCENT_BORDER: Record<string, string> = {
  amber:  "hover:border-amber-400/40",
  blue:   "hover:border-blue-400/40",
  violet: "hover:border-violet-400/40",
  zinc:   "hover:border-zinc-400/40",
  yellow: "hover:border-yellow-400/40",
  teal:   "hover:border-teal-400/40",
};

const ACCENT_GLOW: Record<string, string> = {
  amber:  "rgba(251,191,36,0.14)",
  blue:   "rgba(96,165,250,0.14)",
  violet: "rgba(167,139,250,0.14)",
  zinc:   "rgba(161,161,170,0.10)",
  yellow: "rgba(250,204,21,0.14)",
  teal:   "rgba(45,212,191,0.14)",
};

const ACCENT_TEXT: Record<string, string> = {
  amber:  "text-amber-400",
  blue:   "text-blue-400",
  violet: "text-violet-400",
  zinc:   "text-zinc-300",
  yellow: "text-yellow-400",
  teal:   "text-teal-400",
};

const BADGE_STYLE: Record<string, string> = {
  amber:  "text-amber-400 border-amber-400/40 bg-amber-400/10",
  blue:   "text-blue-400 border-blue-400/40 bg-blue-400/10",
  violet: "text-violet-400 border-violet-400/40 bg-violet-400/10",
  zinc:   "text-zinc-300 border-zinc-400/40 bg-zinc-400/10",
  yellow: "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  teal:   "text-teal-400 border-teal-400/40 bg-teal-400/10",
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: "easeOut" as const },
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
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{ y: hovered ? -6 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl border border-white/8 bg-white/5 backdrop-blur-md overflow-hidden cursor-pointer h-full flex flex-col transform-gpu transition-[border-color] duration-300 ${ACCENT_BORDER[vehicle.accentColor]}`}
        style={{ willChange: "transform" }}
      >
        {/* Glow overlay on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(ellipse at top left, ${ACCENT_GLOW[vehicle.accentColor]}, transparent 70%)`,
          }}
        />

        {/* Vehicle photo */}
        <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out"
            style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
          />
          {/* Bottom fade so image blends into card body */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/20 to-transparent" />

          {vehicle.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span
                className={`text-xs font-bold uppercase tracking-widest border rounded-full px-2.5 py-1 ${BADGE_STYLE[vehicle.accentColor]}`}
              >
                {vehicle.badge}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="relative z-10 p-5 flex flex-col flex-1">
          {/* Name & category */}
          <div className="mb-4">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${ACCENT_TEXT[vehicle.accentColor]}`}>
              {vehicle.category}
            </p>
            <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Seats", value: `${vehicle.seats}` },
              { label: "Fuel",  value: vehicle.fuel },
              { label: "Trans.", value: vehicle.transmission === "Automatic" ? "Auto." : "Manual" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg bg-white/5 border border-white/8 px-2 py-2 text-center"
              >
                <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
                <p className="text-xs font-semibold text-zinc-200">{value}</p>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
            {vehicle.features.map((f) => (
              <span
                key={f}
                className="text-xs text-zinc-400 bg-white/5 border border-white/8 rounded-full px-2.5 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
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
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
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
