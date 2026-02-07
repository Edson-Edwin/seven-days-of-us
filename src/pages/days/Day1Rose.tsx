import { motion } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import FallingPetals from "@/components/FallingPetals";

export default function Day1Rose() {
  return (
    <DayLayout title="Rose Day" emoji="🌹" className="bg-background">
      <FallingPetals count={25} />

      <div className="relative z-10 max-w-md mx-auto space-y-8">
        {/* Digital Rose Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="bg-card rounded-3xl p-8 text-center shadow-xl border border-primary/10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🌹
          </motion.div>

          <h2 className="font-handwritten text-3xl text-foreground mb-4">
            A Rose For You
          </h2>

          <div className="space-y-4 font-display text-muted-foreground text-base leading-relaxed italic">
            <p>
              {/* CUSTOMIZE: Replace with your personal message */}
              Every rose reminds me of you — beautiful, graceful, and worth
              every thorn life throws our way.
            </p>
            <p>
              You are my garden, my sunshine, and my reason to bloom.
            </p>
            <p className="text-primary font-semibold">
              I love you more than words could ever say. 🌹
            </p>
          </div>
        </motion.div>

        {/* Music hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-sm text-muted-foreground/60 italic"
        >
          🎵 Play some soft music and read this slowly, my love.
        </motion.p>
      </div>
    </DayLayout>
  );
}
