import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";

// CUSTOMIZE: Replace placeholder image URLs with your couple photos
const PHOTOS = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&h=400&fit=crop",
];

// CUSTOMIZE: Your love letter
const LOVE_LETTER = `My Dearest Love,

If I had to write down every reason I love you, I'd run out of ink before I ran out of reasons.

You are not just the love of my life — you are my life. Every morning I wake up grateful that I get to walk through this world beside you.

You've held me when I was broken. You've laughed with me when the world felt light. You've loved me in ways I didn't know I deserved.

This week wasn't just about roses or chocolates or teddy bears. It was about telling you, in seven small ways, what I feel every single day:

You are everything.

I didn't build this to impress you. I built it because loving you is my favorite thing.

Forever and always,
Your [Name]`;

export default function Day7Valentine() {
  const [revealed, setRevealed] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <DayLayout title="Happy Valentine's Day" emoji="❤️" className="bg-background">
      <FloatingHearts count={25} />

      <div className="relative z-10 max-w-md mx-auto space-y-8">
        {/* Reveal animation */}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="curtain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-7xl mb-6"
              >
                ❤️
              </motion.div>
              <h2 className="font-handwritten text-3xl text-foreground mb-6">
                Are you ready for the grand finale?
              </h2>
              <Button
                onClick={() => setRevealed(true)}
                className="h-14 px-10 text-lg font-handwritten bg-primary hover:bg-primary/90 rounded-full shadow-lg"
              >
                Reveal My Valentine Surprise ✨
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Photo Slideshow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-3xl overflow-hidden shadow-xl border border-primary/10"
              >
                <div className="relative aspect-[3/2]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={photoIndex}
                      src={PHOTOS[photoIndex]}
                      alt="Our memories"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>
                <div className="p-4 flex justify-center gap-2">
                  {PHOTOS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPhotoIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === photoIndex ? "bg-primary scale-125" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground pb-3 italic">
                  📷 Replace these with our real photos!
                </p>
              </motion.div>

              {/* Love Letter */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
              >
                <h3 className="font-handwritten text-3xl text-primary text-center mb-6">
                  My Letter to You 💌
                </h3>
                <div className="font-display text-foreground/80 text-base leading-relaxed whitespace-pre-line italic">
                  {LOVE_LETTER}
                </div>
              </motion.div>

              {/* Final message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  💕
                </motion.div>
                <p className="font-handwritten text-2xl text-foreground mb-2">
                  I love you.
                </p>
                <p className="font-display text-muted-foreground italic text-sm">
                  Today, tomorrow, and every day after that. ❤️
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DayLayout>
  );
}
