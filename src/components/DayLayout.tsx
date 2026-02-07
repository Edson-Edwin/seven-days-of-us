import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  emoji: string;
  children: ReactNode;
  className?: string;
}

export default function DayLayout({ title, emoji, children, className = "" }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen relative overflow-hidden ${className}`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/hub")}
            className="text-foreground/70 hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-2xl">{emoji}</span>
        </div>

        <div className="px-6 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-handwritten text-4xl md:text-5xl text-center mb-8 text-foreground"
          >
            {title}
          </motion.h1>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
