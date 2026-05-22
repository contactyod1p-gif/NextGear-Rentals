import { motion } from "framer-motion";

const PERKS = [
  {
    id: "fleet",
    title: "Wide Vehicle Selection",
    description:
      "From nimble hatchbacks to rugged 4x4s and superbikes — every drive style covered under one roof in Baraut.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.293 2.293A1 1 0 0016 9h3a1 1 0 011 1v6l-2 2h-5V6z" />
      </svg>
    ),
    accent: "#facc15",
    colSpan: "md:col-span-2",
    tall: false,
    stat: "4+ Vehicles",
    statLabel: "In Fleet",
  },
  {
    id: "support",
    title: "24/7 Roadside Assistance",
    description:
      "Flat tyre at 2 AM on a mountain road? We've got you covered — around the clock, every day of the year.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    accent: "#34d399",
    colSpan: "md:col-span-1",
    tall: true,
    stat: "24/7",
    statLabel: "Support",
  },
  {
    id: "fees",
    title: "Zero Hidden Fees",
    description:
      "The price you see is the price you pay. No booking fees, no surprise surcharges — just clean, honest pricing.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: "#60a5fa",
    colSpan: "md:col-span-1",
    tall: false,
    stat: "₹0",
    statLabel: "Hidden Fees",
  },
  {
    id: "whatsapp",
    title: "Book in Under 5 Minutes",
    description:
      "No lengthy forms or confusing portals. One WhatsApp message and you're confirmed. It's that simple.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
      </svg>
    ),
    accent: "#25d366",
    colSpan: "md:col-span-1",
    tall: false,
    stat: "< 5 min",
    statLabel: "To Book",
  },
  {
    id: "sanitized",
    title: "Sanitized & Insured",
    description:
      "Every vehicle is deep-cleaned before handover and carries comprehensive insurance so you drive worry-free.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    accent: "#f472b6",
    colSpan: "md:col-span-1",
    tall: false,
    stat: "100%",
    statLabel: "Insured",
  },
  {
    id: "rating",
    title: "4.9★ Rated Service",
    description:
      "Hundreds of happy drivers trust us for weekend getaways, business trips, and family journeys.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    accent: "#fbbf24",
    colSpan: "md:col-span-2",
    tall: false,
    stat: "500+",
    statLabel: "Happy Drivers",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function BentoGrid() {
  return (
    <section className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(250,204,21,0.03) 0%, transparent 65%)",
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
            Why Baraut Self Drive
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Built for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Drivers Like You
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
            Every feature is designed around one thing — making your self-drive
            experience as smooth and enjoyable as the road itself.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {PERKS.map((perk, i) => (
            <motion.div
              key={perk.id}
              custom={i}
              variants={itemVariants}
              className={`group relative rounded-2xl border border-white/8 bg-white/[0.03] p-6 overflow-hidden flex flex-col gap-4 hover:border-white/14 transition-all duration-300 ${perk.colSpan} ${perk.tall ? "md:row-span-2" : ""}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 70% 55% at 0% 0%, ${perk.accent}0c 0%, transparent 70%)`,
                }}
              />

              {/* Decorative large icon bg */}
              <div
                className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full pointer-events-none opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-300"
                style={{ background: perk.accent }}
              />

              {/* Icon */}
              <div
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `${perk.accent}14`,
                  border: `1px solid ${perk.accent}28`,
                  color: perk.accent,
                }}
              >
                {perk.icon}
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col gap-1.5 flex-1">
                <h3 className="text-base font-black text-white leading-snug">{perk.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{perk.description}</p>
              </div>

              {/* Stat badge */}
              <div className="relative z-10 mt-auto flex items-center gap-2">
                <div
                  className="rounded-xl px-3 py-1.5 flex flex-col"
                  style={{
                    background: `${perk.accent}10`,
                    border: `1px solid ${perk.accent}20`,
                  }}
                >
                  <span className="text-xl font-black leading-tight" style={{ color: perk.accent }}>
                    {perk.stat}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mt-0.5">
                    {perk.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
