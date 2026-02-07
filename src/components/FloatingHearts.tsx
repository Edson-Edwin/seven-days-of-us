import { useEffect, useState } from "react";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

export default function FloatingHearts({ count = 15 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 20,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 12,
        opacity: 0.15 + Math.random() * 0.3,
      }))
    );
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute text-primary"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `float ${h.duration}s ${h.delay}s ease-in-out infinite`,
            bottom: `${Math.random() * 60}%`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
