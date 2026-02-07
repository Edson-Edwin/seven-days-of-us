import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PASSWORD } from "@/config/days";
import FloatingHearts from "@/components/FloatingHearts";
import { Heart } from "lucide-react";

const Index = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setSuccess(true);
      setTimeout(() => navigate("/hub"), 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <FloatingHearts count={20} />

      <div className="relative z-10 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <Heart className="w-16 h-16 mx-auto text-primary fill-primary" />
              </motion.div>

              <h1 className="font-handwritten text-5xl md:text-6xl text-foreground mb-3">
                7 Days of Love
              </h1>
              <p className="font-display text-muted-foreground text-lg mb-10 italic">
                A surprise made just for you 💕
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    placeholder="Enter our special date..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center text-lg h-12 bg-card/80 border-primary/20 focus:border-primary/50 placeholder:text-muted-foreground/50"
                  />
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    Hint: Our special date 💕
                  </p>
                </div>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-display bg-primary hover:bg-primary/90"
                  >
                    Open My Heart ❤️
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-destructive text-sm"
                    >
                      That's not it, my love. Try again 💕
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <Heart className="w-20 h-20 mx-auto text-primary fill-primary mb-6 animate-heartbeat" />
              </motion.div>
              <h2 className="font-handwritten text-3xl md:text-4xl text-foreground mb-4">
                Welcome, my love
              </h2>
              <p className="font-display text-muted-foreground text-lg italic leading-relaxed">
                This isn't just a website.
                <br />
                It's my heart — one day at a time ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
