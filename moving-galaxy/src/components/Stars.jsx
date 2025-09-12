// src/components/Stars.jsx
import { useEffect, useState } from "react";

export default function Stars({ count = 80 }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-twinkle"
          style={{
            top: star.y,
            left: star.x,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
