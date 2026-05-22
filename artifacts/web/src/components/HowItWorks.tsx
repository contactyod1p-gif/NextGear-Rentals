import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE =
  "Hi Baraut Self Drive Cars! I'd like to book a vehicle. Can you help me get started?";

const STEPS = [
  {
    number: "01",
    title: "Browse the Fleet",
    description:
      "Explore our hand-picked vehicles below. Compare specs, prices, and features to find the perfect ride for your trip.",
    action: { label: "View Fleet", href: "#fleet", external: false },
    accentHex: "#facc15",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8zM13 6l2.293 2.293A1 1 0 0016 9h3a1 1 0 011 1v6l-2 2h-5V6z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Book on WhatsApp",
    description:
      "No lengthy forms. Just tap the Book button and send us a quick WhatsApp message. We confirm availability in minutes.",
    action: {
      label: "Message Us Now",
      href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      external: true,
    },
    accentHex: "#25d366",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Pick Up & Drive",
    description:
      "Arrive at our Baraut location, complete a quick document check, and you're on the road. Zero waiting, pure freedom.",
    action: { label: "Get Directions", href: "https://maps.google.com/?q=Baraut,Uttar+Pradesh", external: true },
    accentHex: "#a78bfa",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      {/* Background decorative line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 30% at 50% 0%, rgba(250,204,21,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            On the Road in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              3 Simple Steps
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
            No paperwork headaches, no confusing portals. Booking your self-drive
            experience takes less than 5 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(250,204,21,0.25) 0%, rgba(250,204,21,0.08) 50%, rgba(167,139,250,0.25) 100%)",
            }}
            aria-hidden
          />

          {STEPS.map((step, i) => (
            <motion.div key={step.number} variants={itemVariants}>
              <div className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 flex flex-col gap-5 h-full overflow-hidden transition-all duration-300 hover:border-white/16">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${step.accentHex}0c 0%, transparent 70%)`,
                  }}
                />

                {/* Step number + icon row */}
                <div className="relative z-10 flex items-center justify-between">
                  {/* Icon circle */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `${step.accentHex}14`,
                      border: `1px solid ${step.accentHex}28`,
                      color: step.accentHex,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Step number — large, decorative */}
                  <span
                    className="text-5xl font-black leading-none select-none"
                    style={{ color: `${step.accentHex}18` }}
                    aria-hidden
                  >
                    {step.number}
                  </span>
                </div>

                {/* Text content */}
                <div className="relative z-10 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: step.accentHex }}
                    />
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: step.accentHex }}
                    >
                      Step {i + 1}
                    </p>
                  </div>
                  <h3 className="text-xl font-black text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>

                {/* Action link */}
                <a
                  href={step.action.href}
                  {...(step.action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="relative z-10 inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200 group/link w-fit"
                  style={{ color: step.accentHex }}
                >
                  {step.action.label}
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom trust note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500"
        >
          {[
            { icon: "✓", text: "No booking fees" },
            { icon: "✓", text: "Instant WhatsApp confirmation" },
            { icon: "✓", text: "Sanitized & insured vehicles" },
            { icon: "✓", text: "24/7 roadside support" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span className="text-yellow-400 font-bold">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
