import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";

const LETTER = `From the moment I met you, I knew my life was about to change forever. You weren't just a person — you were the answer to a prayer I didn't know I had whispered.

If I could go back in time and stand at that altar again, I wouldn't change a single thing. I'd say yes. I'd say yes a thousand times.

You are my forever, my always, and my everything.

Will you let me keep loving you... forever? 💍`;

export default function Day2Propose() {
  const [showButton, setShowButton] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);

  const handleComplete = useCallback(() => {
    setShowButton(true);
  }, []);

  const handleYes = () => {
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 4000);
  };

  return (
    <DayLayout title="Propose Day" emoji="💍" className="bg-background">
      {heartBurst && <FloatingHearts count={40} />}

      <div className="relative z-10 max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
        >
          <TypewriterText
            text={LETTER}
            speed={40}
            className="font-display text-foreground leading-relaxed whitespace-pre-line text-base italic"
            onComplete={handleComplete}
          />
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                onClick={handleYes}
                className="h-14 px-10 text-lg font-handwritten bg-primary hover:bg-primary/90 rounded-full shadow-lg"
              >
                I'd say YES again ❤️
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {heartBurst && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center font-handwritten text-2xl text-primary"
            >
              And I'd ask you again, every single day 💕
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </DayLayout>
  );
}
