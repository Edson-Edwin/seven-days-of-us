import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DayLayout from "@/components/DayLayout";

export default function Day7Kiss() {
  const [kisses, setKisses] = useState<{ id: number; x: number; y: number }[]>([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to Valentine's Day
  useEffect(() => {
    const target = new Date();
    target.setMonth(1); // February
    target.setDate(14);
    target.setHours(0, 0, 0, 0);
    if (target.getTime() <= Date.now()) {
      target.setFullYear(target.getFullYear() + 1);
    }

    const update = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Spawn floating kiss emojis
  useEffect(() => {
    const interval = setInterval(() => {
      setKisses((prev) => [
        ...prev.slice(-15),
        { id: Date.now(), x: 10 + Math.random() * 80, y: Math.random() * 100 },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <DayLayout title="Kiss Day" emoji="💋" className="bg-background">
      {/* Floating kisses */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {kisses.map((k) => (
          <motion.span
            key={k.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -150, scale: 1.5 }}
            transition={{ duration: 3 }}
            className="absolute text-2xl"
            style={{ left: `${k.x}%`, bottom: `${k.y}%` }}
          >
            {Math.random() > 0.5 ? "💋" : "❤️"}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-md mx-auto space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
        >
          <div className="text-5xl mb-4">💋</div>
          <p className="font-display text-foreground italic leading-relaxed">
            Some things are better felt than said.
            <br /><br />
            But if I could bottle every kiss I've ever wanted to give you,
            the ocean would be jealous. 💕
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-3xl p-6 shadow-xl border border-primary/10"
        >
          <p className="font-handwritten text-xl text-foreground mb-4">
            Counting down to Valentine's Day ❤️
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="bg-secondary/50 rounded-xl p-3">
                <div className="font-handwritten text-3xl text-primary">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DayLayout>
  );
}
