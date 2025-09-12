// src/components/MouseGlow.jsx
import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none absolute w-96 h-96 rounded-full bg-gradient-radial from-white/20 to-transparent blur-3xl"
      style={{
        top: pos.y - 200,
        left: pos.x - 200,
        transition: "top 0.1s linear, left 0.1s linear",
      }}
    />
  );
}
