import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE =
  "Hi Baraut Self Drive Cars! I am browsing your website and would love to check the availability for renting a vehicle. Please let me know the process.";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <footer className="bg-[#08090a] border-t border-white/6 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xs"
          >
            <span className="text-xl font-black text-white tracking-tight">
              Baraut
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
              >
                Drive
              </span>
            </span>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
              Premium self drive car rentals in Baraut. Sanitized vehicles, transparent pricing, 24/7 support.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-4 h-4 fill-current">
                <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm6.04 18.035c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-10"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Navigate</p>
              <ul className="space-y-2">
                {[
                  { label: "Our Fleet", href: "#fleet" },
                  { label: "Book a Car", href: "#book" },
                  { label: "Why Choose Us", href: "#why-us" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Business</p>
              <ul className="space-y-2">
                {[
                  { label: "Partner Login", href: "/admin" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms & Conditions", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Baraut Self Drive Cars. All rights reserved.</span>
          <span>Proudly serving Baraut & surrounding areas.</span>
        </div>
      </div>
    </footer>
  );
}
