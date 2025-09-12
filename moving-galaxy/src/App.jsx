// src/App.jsx
import { motion } from "framer-motion";
import Stars from "./components/Stars";
import MouseGlow from "./components/MouseGlow";

export default function App() {
  return (
    <div className="relative h-screen w-full overflow-hidden animated-bg flex items-center justify-center">
      {/* Stars Background */}
      <Stars count={100} />

      {/* Floating Orbs */}
      <div className="orb top-20 left-10"></div>
      <div className="orb bottom-32 right-20"></div>
      <div className="orb top-40 right-1/3"></div>

      {/* Mouse Glow */}
      <MouseGlow />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold gradient-text"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to the Galaxy ✨
        </motion.h1>

        <motion.p
          className="mt-4 text-xl md:text-2xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Colors. Motion. Magic.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 px-8 py-3 rounded-2xl bg-white/20 backdrop-blur-lg border border-white/40 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Enter the Universe 🚀
        </motion.button>
      </div>
    </div>
  );
}
