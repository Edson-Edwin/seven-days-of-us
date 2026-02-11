import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email";

// CUSTOMIZE: Replace with your personal promises
const MY_PROMISES = [
  "I promise to always make you laugh, even on your hardest days.",
  "I promise to hold your hand through every storm.",
  "I promise to never stop choosing you — every single day.",
  "I promise to be your biggest fan, your safest place, and your best friend.",
  "I promise to grow old with you and still look at you the way I do now.",
];

const COLORS = [
  "bg-pink-100 border-pink-200",
  "bg-yellow-100 border-yellow-200",
  "bg-blue-100 border-blue-200",
  "bg-green-100 border-green-200",
  "bg-purple-100 border-purple-200",
  "bg-orange-100 border-orange-200",
];

export default function Day5Promise() {
  const [herPromise, setHerPromise] = useState("");
  const [savedPromises, setSavedPromises] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load multiple promises (new format)
    const savedList = localStorage.getItem("7dol-her-promises");
    if (savedList) {
      try {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed)) {
          setSavedPromises(parsed);
        }
      } catch {
        // ignore parse errors
      }
    } else {
      // Backwards compatibility: migrate single saved promise if it exists
      const legacy = localStorage.getItem("7dol-her-promise");
      if (legacy) {
        setSavedPromises([legacy]);
        localStorage.setItem("7dol-her-promises", JSON.stringify([legacy]));
      }
    }
  }, []);

  const handleSave = async () => {
    const trimmed = herPromise.trim();
    if (!trimmed) return;

    setIsSaving(true);

    try {
      // Save locally (append to list)
      const updated = [...savedPromises, trimmed];
      localStorage.setItem("7dol-her-promises", JSON.stringify(updated));
      setSavedPromises(updated);
      setHerPromise("");

      // Send to your email
      const success = await sendEmail({
        message: `Her promise: ${trimmed}`,
        from_name: "Promise Day",
      });

      if (success) {
        toast.success("Promise saved 💌", {
          description: "Her promise has been sent to his email.",
        });
      } else {
        toast.error("Email not configured", {
          description: "Please set up EmailJS environment variables.",
        });
      }
    } catch (error) {
      toast.error("Failed to send email", {
        description: "There was an error sending the promise to your email.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const allPromises = [...MY_PROMISES, ...savedPromises];
  const herStartIndex = MY_PROMISES.length;

  return (
    <DayLayout title="Promise Day" emoji="🤝" className="bg-background">
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-display text-muted-foreground italic"
        >
          My promises to you, written in love 💕
        </motion.p>

        {/* Promise Wall */}
        <div className="grid grid-cols-1 gap-4">
          {allPromises.map((promise, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 1 : -1 }}
              transition={{ delay: i * 0.15 }}
              className={`p-5 rounded-xl border shadow-sm ${COLORS[i % COLORS.length]}`}
            >
              <p className="font-body text-sm text-foreground/80 leading-relaxed">
                {promise}
              </p>
              {i >= herStartIndex && savedPromises.length > 0 && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  — Your promise 💕
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Her promise input – can add more than one */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-card rounded-2xl p-5 border border-primary/10 space-y-3"
        >
          <p className="font-handwritten text-xl text-foreground text-center">
            Your turn, my love 💕
          </p>
          <p className="font-display text-xs text-muted-foreground text-center italic">
            Write me promises — I&apos;ll keep every single one
          </p>
          <Input
            value={herPromise}
            onChange={(e) => setHerPromise(e.target.value)}
            placeholder="I promise to..."
            className="text-center bg-card border-primary/20"
          />
          <Button
            onClick={handleSave}
            disabled={!herPromise.trim() || isSaving}
            className="w-full font-handwritten text-lg disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save My Promise ❤️"}
          </Button>
        </motion.div>
      </div>
    </DayLayout>
  );
}
