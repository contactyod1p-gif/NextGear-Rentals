import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What documents do I need to rent a vehicle?",
    a: "You'll need a valid driving licence (at least 1 year old), a government-issued photo ID (Aadhaar, Passport, or Voter ID), and a refundable security deposit. International visitors need a valid International Driving Permit (IDP) along with their home country licence.",
  },
  {
    q: "Is there a minimum rental duration?",
    a: "Our minimum rental period is 12 hours. For the best rates, we recommend booking for full days. Weekly and monthly packages offer significant discounts — check our Pricing Calculator above or message us on WhatsApp for custom quotes.",
  },
  {
    q: "What is the fuel policy?",
    a: "All vehicles are provided with a full tank of fuel and must be returned with a full tank. If the vehicle is returned with less fuel, the difference is charged at actual pump rates plus a small refuelling service fee. This keeps pricing completely transparent for you.",
  },
  {
    q: "What happens in case of a breakdown or accident?",
    a: "Every vehicle comes with 24/7 roadside assistance. In the unlikely event of a breakdown, call our support line and we'll arrange a replacement vehicle or on-site support within hours. All vehicles are comprehensively insured — you are only liable for the agreed excess amount.",
  },
  {
    q: "Can I take the vehicle outside Uttar Pradesh?",
    a: "Yes, inter-state travel is permitted with prior written approval. Please inform us at the time of booking. Additional documentation (NOC letter) will be provided at no charge. Some remote areas in Himachal Pradesh and Uttarakhand may have restrictions — we'll advise you during booking.",
  },
  {
    q: "Is there a mileage limit?",
    a: "Our standard packages include 200 km per day (unlimited for weekly/monthly plans). Overages are charged at ₹8–₹12 per additional kilometre depending on the vehicle. The exact rate is shown on your booking confirmation so there are zero surprises.",
  },
  {
    q: "Can I cancel or modify my booking?",
    a: "Cancellations made 24+ hours before pickup receive a full refund. Cancellations within 24 hours incur a one-day charge. Modifications to pickup time or duration are free when requested at least 6 hours in advance. Just message us on WhatsApp — we make it easy.",
  },
  {
    q: "Do you offer airport or doorstep delivery?",
    a: "Yes! We offer vehicle delivery and pickup at your home, hotel, or a nearby landmark in and around Baraut for a nominal convenience fee. Delivery to IGI Delhi and Hindon Airport is available — please enquire when booking.",
  },
];

function FAQItem({ item, index }: { item: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div
        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
          open
            ? "border-yellow-400/30 bg-yellow-400/[0.03]"
            : "border-white/8 bg-white/[0.02] hover:border-white/14"
        }`}
      >
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          aria-expanded={open}
        >
          <span className={`text-sm font-bold leading-snug transition-colors duration-200 ${open ? "text-yellow-400" : "text-white"}`}>
            {item.q}
          </span>
          <span
            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
              open
                ? "border-yellow-400/40 bg-yellow-400/10 rotate-45"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-colors duration-200 ${open ? "text-yellow-400" : "text-zinc-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-5">
                <div className="h-px bg-yellow-400/10 mb-4" />
                <p className="text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  const WHATSAPP_URL = `https://wa.me/918135829196?text=${encodeURIComponent("Hi! I have a question about renting a vehicle from Baraut Self Drive Cars.")}`;

  return (
    <section className="bg-[#08090a] py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 100%, rgba(250,204,21,0.03) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-yellow-400 mb-4">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Got{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Questions?
            </span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm leading-relaxed">
            Everything you need to know before your first self-drive booking.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} item={faq} index={i} />
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div>
            <p className="text-sm font-bold text-white">Still have questions?</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Chat with us directly — we usually reply in under 5 minutes.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #25d366 0%, #128c4a 100%)",
              boxShadow: "0 4px 16px rgba(37,211,102,0.25)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-white shrink-0">
              <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
            </svg>
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
