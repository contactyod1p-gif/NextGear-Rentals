import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE =
  "Hi Baraut Self Drive Cars! I am browsing your website and would love to check the availability for renting a vehicle. Please let me know the process.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Fleet", href: "#fleet" },
    { label: "Book", href: "#book" },
    { label: "Why Us", href: "#why-us" },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090a]/90 backdrop-blur-xl border-b border-white/8 shadow-2xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-xl font-black text-white tracking-tight">
            Baraut
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Drive
            </span>
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="/admin"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            Partner Login
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transform-gpu text-sm font-bold text-zinc-900 bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 rounded-full px-5 py-2 hover:scale-105 active:scale-95"
          >
            Book Now
          </a>
        </div>

        <button
          className="sm:hidden text-zinc-400 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="sm:hidden bg-[#08090a]/95 backdrop-blur-xl border-t border-white/8 px-6 py-4 flex flex-col gap-4"
        >
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Partner Login
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-bold text-zinc-900 bg-yellow-400 rounded-full px-5 py-2.5 text-center"
          >
            Book Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
