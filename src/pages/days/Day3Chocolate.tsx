import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import { Button } from "@/components/ui/button";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  message: string;
}

// CUSTOMIZE: Replace with your own questions and messages
const QUESTIONS: QuizQuestion[] = [
  {
    question: "Where did we have our first date?",
    options: ["A coffee shop", "A movie theater", "A park", "A restaurant"],
    correct: 0,
    message: "That little coffee shop where my heart skipped a beat for the first time ☕❤️",
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your laugh", "Your kindness", "Everything"],
    correct: 3,
    message: "Trick question! I can't pick just one — everything about you is perfect 💕",
  },
  {
    question: "What song reminds me of us?",
    options: ["Perfect – Ed Sheeran", "All of Me – John Legend", "A Thousand Years", "Tum Hi Ho"],
    correct: 1,
    message: "Because you have all of me, and I wouldn't have it any other way 🎵",
  },
];

export default function Day3Chocolate() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelected(optionIndex);
    if (optionIndex === QUESTIONS[currentQ].correct) {
      setScore((s) => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const q = QUESTIONS[currentQ];

  return (
    <DayLayout title="Chocolate Day" emoji="🍫" className="bg-background">
      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center font-display text-muted-foreground italic mb-4"
        >
          How well do you know our love? 🍫
        </motion.p>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-card rounded-3xl p-6 shadow-xl border border-primary/10"
            >
              <p className="text-xs text-muted-foreground mb-2">
                Question {currentQ + 1} of {QUESTIONS.length}
              </p>
              <h3 className="font-handwritten text-2xl text-foreground mb-5">
                {q.question}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selected === null && handleAnswer(i)}
                    disabled={selected !== null}
                    className={`w-full text-left p-4 rounded-xl font-body text-sm transition-all border ${
                      selected === null
                        ? "border-border hover:border-primary/30 hover:bg-secondary/50"
                        : i === q.correct
                        ? "border-green-400 bg-green-50 text-green-800"
                        : i === selected
                        ? "border-destructive/40 bg-destructive/5 text-destructive"
                        : "border-border opacity-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5"
                  >
                    <p className="font-display text-sm text-primary italic mb-4">
                      {q.message}
                    </p>
                    <Button
                      onClick={nextQuestion}
                      className="w-full font-handwritten text-lg"
                    >
                      {currentQ < QUESTIONS.length - 1 ? "Next 💕" : "See Results 🍫"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10 text-center"
            >
              <div className="text-5xl mb-4">🍫</div>
              <h3 className="font-handwritten text-3xl text-foreground mb-3">
                {score === QUESTIONS.length ? "You know me perfectly!" : "Sweet Results!"}
              </h3>
              <p className="font-display text-muted-foreground italic">
                You got {score} out of {QUESTIONS.length} right!
                <br />
                But honestly, every answer is right when it's about us ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DayLayout>
  );
}
