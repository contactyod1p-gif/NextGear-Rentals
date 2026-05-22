import { motion } from "framer-motion";
import { useState } from "react";

const WHATSAPP_NUMBER = "918135829196";

function buildQuickBookUrl(vehicleName: string, price: number): string {
  const message = `Hi Baraut Self Drive Cars! I am interested in booking the *${vehicleName}* at ₹${price.toLocaleString("en-IN")}/day. Please let me know the availability and booking process.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface Vehicle {
  name: string;
  category: string;
  pricePerDay: number;
  fuel: string;
  transmission: string;
  features: string[];
  badge?: string;
  accentColor: string;
  imageSrc: string;
}

const FLEET: Vehicle[] = [
  {
    name: "BMW 3 Series",
    category: "Luxury Rental",
    pricePerDay: 8000,
    fuel: "Petrol",
    transmission: "Automatic",
    features: ["Premium Leather Seats", "Sunroof", "Sport Mode", "Bluetooth Audio"],
    badge: "Luxury",
    accentColor: "blue",
    imageSrc: "/images/baraut-bmw.jpg",
  },
  {
    name: "Mahindra Thar 4x4",
    category: "Off-Road SUV",
    pricePerDay: 3500,
    fuel: "Diesel",
    transmission: "Manual",
    features: ["4x4 Drive", "Convertible Top", "Off-Road Ready", "Bluetooth"],
    badge: "Most Popular",
    accentColor: "amber",
    imageSrc: "/images/baraut-thar.jpg",
  },
  {
    name: "Maruti Swift VXI",
    category: "Hatchback",
    pricePerDay: 1500,
    fuel: "Petrol",
    transmission: "Manual",
    features: ["Fuel Efficient", "Easy to Drive", "Touchscreen Infotainment", "AC"],
    badge: "Best Value",
    accentColor: "green",
    imageSrc: "/images/baraut-swift.jpg",
  },
  {
    name: "Hyundai i20 Asta",
    category: "Premium Hatchback",
    pricePerDay: 1800,
    fuel: "Petrol",
    transmission: "Manual",
    features: ["Sunroof", "Wireless Charging", "Lane Assist", "6 Airbags"],
    accentColor: "violet",
    imageSrc: "/images/baraut-i20.jpg",
  },
];

const ACCENT_BORDER: Record<string, string> = {
  blue:   "hover:border-blue-400/40",
  amber:  "hover:border-amber-400/40",
  green:  "hover:border-green-400/40",
  violet: "hover:border-violet-400/40",
};

const ACCENT_GLOW: Record<string, string> = {
  blue:   "rgba(96,165,250,0.14)",
  amber:  "rgba(251,191,36,0.14)",
  green:  "rgba(74,222,128,0.14)",
  violet: "rgba(167,139,250,0.14)",
};

const ACCENT_TEXT: Record<string, string> = {
  blue:   "text-blue-400",
  amber:  "text-amber-400",
  green:  "text-green-400",
  violet: "text-violet-400",
};

const BADGE_STYLE: Record<string, string> = {
  blue:   "text-blue-400 border-blue-400/40 bg-blue-400/10",
  amber:  "text-amber-400 border-amber-400/40 bg-amber-400/10",
  green:  "text-green-400 border-green-400/40 bg-green-400/10",
  violet: "text-violet-400 border-violet-400/40 bg-violet-400/10",
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(ellipse at top left, ${ACCENT_GLOW[vehicle.accentColor]}, transparent 70%)`,
          }}
        />

        {/* Vehicle photo */}
        <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0 bg-zinc-900">
          {!imgError ? (
            <img
              src={vehicle.imageSrc}
              alt={vehicle.name}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-out"
              style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-900">
              <svg className="w-12 h-12 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <p className="text-xs text-zinc-600">Image coming soon</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-[#0d0d10]/20 to-transparent" />

          {vehicle.badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className={`text-xs font-bold uppercase tracking-widest border rounded-full px-2.5 py-1 ${BADGE_STYLE[vehicle.accentColor]}`}>
                {vehicle.badge}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="mb-4">
            <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${ACCENT_TEXT[vehicle.accentColor]}`}>
              {vehicle.category}
            </p>
            <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Fuel", value: vehicle.fuel },
              { label: "Trans.", value: vehicle.transmission === "Automatic" ? "Auto." : "Manual" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-white/5 border border-white/8 px-3 py-2 text-center">
                <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
                <p className="text-xs font-semibold text-zinc-200">{value}</p>
              </div>
            ))}
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5 mb-4 flex-1">
            {vehicle.features.map((f) => (
              <span key={f} className="text-xs text-zinc-400 bg-white/5 border border-white/8 rounded-full px-2.5 py-1">
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
              href={buildQuickBookUrl(vehicle.name, vehicle.pricePerDay)}
              target="_blank"
              rel="noopener noreferrer"
              className="transform-gpu flex items-center gap-1.5 text-xs font-bold text-white bg-[#25d366] hover:bg-[#1ebe5a] transition-colors rounded-full px-4 py-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-white shrink-0">
                <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
              </svg>
              Quick Book
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
            From rugged 4x4s to luxury sedans — every car is sanitized, insured, and roadside-assist ready.
            Click "Quick Book" to instantly message us on WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLEET.map((vehicle, i) => (
            <VehicleCard key={vehicle.name} vehicle={vehicle} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
