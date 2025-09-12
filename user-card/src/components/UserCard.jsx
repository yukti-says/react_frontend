import { motion } from "framer-motion";

export default function UserCard({ name, email, photo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="w-72 p-6 rounded-2xl backdrop-blur-md bg-white/10 shadow-xl border border-white/20 text-white flex flex-col items-center transition"
    >
      <img
        src={photo}
        alt={name}
        className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
      />
      <h2 className="mt-4 text-xl font-bold">{name}</h2>
      <p className="text-sm text-gray-200">{email}</p>
      <button className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold hover:opacity-90 transition">
        Connect
      </button>
    </motion.div>
  );
}
