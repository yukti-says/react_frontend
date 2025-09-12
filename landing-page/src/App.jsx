// src/App.jsx
import { useState } from "react";
import { motion } from "framer-motion";

const gradients = [
  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600",
  "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700",
  "bg-gradient-to-r from-blue-700 to-stone-900",
  "bg-gradient-to-r from-slate-400 via-violet-600 to-stone-900",
  "bg-gradient-to-tr from-neutral-800 via-violet-600 to-zinc-900",
  "bg-gradient-to-br from-indigo-800 to-teal-600",
  "bg-gradient-to-br from-indigo-800 via-pink-800 to-cyan-700",
  "bg-gradient-to-b from-gray-900 via-teal-600 to-teal-800",
  "bg-gradient-to-b from-gray-900 via-purple-900 to-teal-800",
  "bg-gradient-to-r from-lime-500 via-emerald-600 to-green-900",
  "bg-gradient-to-t from-neutral-800 via-blue-400 to-green-900",
];

export default function App() {
  const [index, setIndex] = useState(0);

  const handleGradientChange = () => {
    setIndex((prev) => (prev + 1) % gradients.length);
  };

  return (
    <div
      className={`h-screen w-full flex items-center justify-center transition-all duration-1000 ${gradients[index]}`}
    >
      <div className="text-center text-white p-6">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Gradient Magic ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg md:text-2xl text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Play with colors. Feel the vibes.
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGradientChange}
          className="mt-8 px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          Change Gradient 🎨
        </motion.button>
      </div>
    </div>
  );
}
