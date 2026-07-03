import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface CountdownStepProps {
  onComplete: () => void;
}

const CountdownStep = ({ onComplete }: CountdownStepProps) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count < 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatePresence mode="wait">
        {count >= 0 && (
          <motion.div
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            {/* Neon circle */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full neon-glow-pink flex items-center justify-center border-2 border-neon-pink animate-neon-pulse">
              <span className="font-display text-7xl md:text-9xl font-bold text-neon-pink">
                {count === 0 ? "🎉" : count}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountdownStep;
