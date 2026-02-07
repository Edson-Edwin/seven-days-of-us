import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import FloatingHearts from "@/components/FloatingHearts";

export default function Day6Hug() {
  const [hugged, setHugged] = useState(false);

  return (
    <DayLayout title="Hug Day" emoji="🤗" className="bg-background">
      <FloatingHearts count={12} />

      <div className="relative z-10 max-w-md mx-auto space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
        >
          <div className="text-5xl mb-4">🤗</div>
          <p className="font-display text-foreground italic leading-relaxed">
            Some days, all you need is a hug that holds all the words
            you can't say. This one's for you. 💛
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <AnimatePresence mode="wait">
            {!hugged ? (
              <motion.button
                key="btn"
                onClick={() => setHugged(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground font-handwritten text-xl px-10 py-5 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
              >
                Need a Hug? 🤗
              </motion.button>
            ) : (
              <motion.div
                key="hug"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="space-y-6"
              >
                {/* Hug animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-8xl"
                >
                  🫂
                </motion.div>

                {/* Glow ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary/10 blur-3xl -z-10"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-card rounded-3xl p-6 shadow-xl border border-primary/10"
                >
                  <p className="font-display text-foreground italic leading-relaxed text-lg">
                    If I were there right now, this hug would last a little longer. 💕
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DayLayout>
  );
}
