import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import { Button } from "@/components/ui/button";

export default function Day4Teddy() {
  const [hugged, setHugged] = useState(false);

  return (
    <DayLayout title="Teddy Day" emoji="🧸" className="bg-background">
      <div className="relative z-10 max-w-md mx-auto space-y-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
        >
          <motion.div
            animate={hugged ? { scale: [1, 1.3, 1.1], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.8 }}
            className="text-8xl mb-6"
          >
            🧸
          </motion.div>

          <h2 className="font-handwritten text-2xl text-foreground mb-3">
            Every teddy wishes it could hug like me
          </h2>

          <p className="font-display text-muted-foreground italic text-sm mb-6">
            {/* CUSTOMIZE: Your personal message */}
            No stuffed bear could ever replace the warmth of holding you close.
            But until I can, this little one will keep you company. 🧸
          </p>

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setHugged(true)}
              className="h-14 px-10 text-lg font-handwritten bg-primary hover:bg-primary/90 rounded-full shadow-lg"
            >
              Need a hug? 🤗
            </Button>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {hugged && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🤗💕
              </motion.div>
              <p className="font-handwritten text-2xl text-primary mb-2">
                *hugs you tight*
              </p>
              <p className="font-display text-muted-foreground italic leading-relaxed">
                Imagine my arms around you right now.
                <br />
                Feel that warmth? That's my love reaching you,
                <br />
                no matter how far apart we are. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DayLayout>
  );
}
