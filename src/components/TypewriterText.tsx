import { useState, useEffect } from "react";

interface Props {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({ text, speed = 50, className = "", onComplete }: Props) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [index, text, speed, onComplete]);

  return (
    <p className={className}>
      {displayed}
      {index < text.length && <span className="animate-pulse">|</span>}
    </p>
  );
}
