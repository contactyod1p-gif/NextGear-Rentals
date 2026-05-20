import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "918135829196";
const WHATSAPP_MESSAGE = "Hi NextGear! I'd like to enquire about a vehicle rental.";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="bg-zinc-900 border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-xl whitespace-nowrap"
          >
            Chat on WhatsApp
            {/* Arrow */}
            <span className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-b-[5px] border-l-[5px] border-t-transparent border-b-transparent border-l-zinc-900" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transform-gpu"
        style={{
          background: "linear-gradient(135deg, #25d366 0%, #128c4a 100%)",
          boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
        }}
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-20" />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white relative z-10"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.635 4.592 1.84 6.541L2.667 29.333l6.98-1.812A13.275 13.275 0 0016.003 29.333c7.363 0 13.33-5.97 13.33-13.333 0-7.363-5.967-13.333-13.33-13.333zm0 24.267a11.04 11.04 0 01-5.63-1.543l-.404-.24-4.142 1.075 1.107-4.019-.264-.42A10.977 10.977 0 015.003 16c0-6.07 4.933-11.003 11-11.003S27.003 9.93 27.003 16s-4.93 11.003-11 10.934zm6.04-8.232c-.33-.166-1.955-.962-2.258-1.073-.302-.11-.522-.165-.742.166-.22.33-.852 1.072-1.044 1.292-.193.22-.386.247-.716.083-.33-.165-1.393-.512-2.655-1.636-.98-.874-1.643-1.953-1.836-2.283-.192-.33-.02-.508.145-.672.149-.147.33-.385.495-.577.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.742-1.788-1.017-2.448-.267-.64-.54-.553-.742-.563-.192-.01-.413-.012-.633-.012-.22 0-.578.082-.88.412-.303.33-1.155 1.127-1.155 2.75s1.182 3.19 1.347 3.41c.165.22 2.327 3.553 5.64 4.984.788.34 1.403.543 1.882.695.79.252 1.51.217 2.079.132.634-.095 1.955-.8 2.23-1.572.275-.771.275-1.433.193-1.572-.083-.138-.303-.22-.633-.385z" />
        </svg>
      </motion.a>
    </div>
  );
}
