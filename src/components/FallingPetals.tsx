import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

export default function FallingPetals({ count = 20 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 14 + Math.random() * 18,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
      }))
    );
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            animation: `petal-fall ${p.duration}s ${p.delay}s linear infinite`,
            top: 0,
          }}
        >
          🌹
        </span>
      ))}
    </div>
  );
}
