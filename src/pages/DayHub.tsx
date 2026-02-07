import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { DAYS, isDayUnlocked, isTodayDay } from "@/config/days";
import FloatingHearts from "@/components/FloatingHearts";

export default function DayHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts count={10} />

      <div className="relative z-10 px-6 py-10 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-handwritten text-5xl text-foreground mb-2">
            7 Days of Love
          </h1>
          <p className="font-display text-muted-foreground italic">
            One surprise each day, just for you 💕
          </p>
        </motion.div>

        <div className="space-y-4">
          {DAYS.map((day, i) => {
            const unlocked = isDayUnlocked(i);
            const isToday = isTodayDay(i);

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <button
                  onClick={() => unlocked && navigate(day.route)}
                  disabled={!unlocked}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    unlocked
                      ? "bg-card hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] cursor-pointer border border-primary/10"
                      : "bg-muted/50 cursor-not-allowed border border-border/50"
                  } ${isToday ? "ring-2 ring-primary/40 shadow-md shadow-primary/10" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-3xl ${!unlocked ? "blur-sm grayscale" : ""}`}
                    >
                      {day.emoji}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`font-handwritten text-2xl ${
                            unlocked ? "text-foreground" : "text-muted-foreground/50"
                          }`}
                        >
                          Day {day.day} — {day.title}
                        </h3>
                        {isToday && (
                          <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            <Sparkles className="w-3 h-3" /> New!
                          </span>
                        )}
                      </div>
                      <p
                        className={`font-body text-sm ${
                          unlocked
                            ? "text-muted-foreground"
                            : "text-muted-foreground/30"
                        }`}
                      >
                        {unlocked
                          ? day.subtitle
                          : "Your surprise will unlock soon 💕"}
                      </p>
                    </div>

                    {!unlocked && (
                      <Lock className="w-5 h-5 text-muted-foreground/30 flex-shrink-0" />
                    )}
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
