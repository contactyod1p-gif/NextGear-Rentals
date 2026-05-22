import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Rahul Verma",
    location: "Delhi",
    vehicle: "BMW 3 Series",
    rating: 5,
    text: "Absolutely flawless experience. The BMW was spotless and delivered right on time. The whole booking process took under 5 minutes on WhatsApp. This is how premium rentals should work.",
    initials: "RV",
    accent: "#60a5fa",
  },
  {
    name: "Priya Sharma",
    location: "Ghaziabad",
    vehicle: "Hyundai i20 Asta",
    rating: 5,
    text: "I was nervous about self-drive rentals but Baraut made it so easy. The car was sanitized, documents were minimal, and the team was responsive throughout. Will definitely book again.",
    initials: "PS",
    accent: "#a78bfa",
  },
  {
    name: "Arjun Singh",
    location: "Meerut",
    vehicle: "Mahindra Thar 4x4",
    rating: 5,
    text: "Took the Thar for a weekend trip to the hills. Beast of a machine, zero issues on the road. Baraut's 24/7 support gave us peace of mind throughout. Highly recommend.",
    initials: "AS",
    accent: "#facc15",
  },
  {
    name: "Neha Gupta",
    location: "Muzaffarnagar",
    vehicle: "Maruti Swift VXI",
    rating: 5,
    text: "The Swift was fuel-efficient and in perfect condition. Transparent pricing — exactly what was quoted, not a rupee more. Rare to find such honest service these days.",
    initials: "NG",
    accent: "#34d399",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400" : "text-zinc-700"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" as const },
  }),
};

export default function Testimonials() {
  return (
    <section className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 100%, rgba(250,204,21,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            Customer Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Trusted by Drivers{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Across the Region
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
            Real stories from real customers who chose Baraut Self Drive Cars
            for their journeys. No filters, no fake reviews.
          </p>

          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-3"
          >
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-bold text-white">4.9 / 5</span>
            <span className="text-xs text-zinc-500">from 500+ happy customers</span>
          </motion.div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 flex flex-col gap-4 overflow-hidden hover:border-white/16 transition-all duration-300"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${t.accent}0d 0%, transparent 70%)`,
                }}
              />

              {/* Quote mark */}
              <div
                className="absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none"
                style={{ color: `${t.accent}18` }}
                aria-hidden
              >
                "
              </div>

              {/* Stars */}
              <StarRating count={t.rating} />

              {/* Review text */}
              <p className="relative z-10 text-sm text-zinc-400 leading-relaxed flex-1">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="border-t border-white/6" />

              {/* Reviewer info */}
              <div className="relative z-10 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{
                    background: `${t.accent}20`,
                    color: t.accent,
                    border: `1px solid ${t.accent}30`,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.location}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-1"
                    style={{
                      background: `${t.accent}12`,
                      color: t.accent,
                      border: `1px solid ${t.accent}20`,
                    }}
                  >
                    {t.vehicle.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-zinc-500">
            Ready to add your own story?{" "}
            <a href="#book" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
              Book your ride today →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
