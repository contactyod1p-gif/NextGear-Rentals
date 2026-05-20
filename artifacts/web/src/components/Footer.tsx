import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#08090a] border-t border-white/6 px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-lg font-black text-white tracking-tight">
            Next
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #facc15 0%, #f59e0b 100%)" }}
            >
              Gear
            </span>
          </span>
          <p className="text-xs text-zinc-600 mt-1">Premium Fleet. Seamless Booking.</p>
        </motion.div>

        <div className="flex items-center gap-6 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} NextGear Rentals</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-zinc-400 cursor-pointer transition-colors">Privacy</span>
          <span className="text-zinc-700">·</span>
          <span className="hover:text-zinc-400 cursor-pointer transition-colors">Terms</span>
        </div>
      </div>
    </footer>
  );
}
