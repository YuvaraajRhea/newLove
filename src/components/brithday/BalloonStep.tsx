import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface BalloonStepProps {
  onNext: () => void;
}

const BALLOONS = [
  { id: 0, word: "You", color: "hsl(330, 100%, 65%)", x: 15 },
  { id: 1, word: "Are", color: "hsl(280, 100%, 70%)", x: 38 },
  { id: 2, word: "A", color: "hsl(220, 100%, 70%)", x: 61 },
  { id: 3, word: "Cutiee", color: "hsl(50, 100%, 65%)", x: 84 },
];

const BalloonStep = ({ onNext }: BalloonStepProps) => {
  const [popped, setPopped] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<string[]>([]);

  const pop = (balloon: typeof BALLOONS[0]) => {
    if (popped.has(balloon.id)) return;
    const next = new Set(popped);
    next.add(balloon.id);
    setPopped(next);
    setRevealed((r) => [...r, balloon.word]);

    if (next.size === BALLOONS.length) {
      setTimeout(() => onNext(), 2500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4"
      >
        🎈 Pop the Balloons! 🎈
      </motion.h2>
      <p className="text-muted-foreground mb-10 text-center">Tap each balloon to reveal a message!</p>

      {/* Balloons */}
      <div className="relative w-full max-w-md h-72 mb-8">
        {BALLOONS.map((b, i) => (
          <div
            key={b.id}
            className="absolute"
            style={{ left: `${b.x}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <AnimatePresence mode="wait">
              {!popped.has(b.id) ? (
                <motion.button
                  key="balloon"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => pop(b)}
                  className="cursor-pointer select-none"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ animation: `balloon-float ${2.5 + i * 0.3}s ease-in-out infinite` }}
                >
                  <svg width="60" height="80" viewBox="0 0 60 80">
                    <ellipse cx="30" cy="30" rx="26" ry="30" fill={b.color} opacity="0.9" />
                    <ellipse cx="22" cy="20" rx="6" ry="8" fill="white" opacity="0.3" />
                    <polygon points="27,58 33,58 30,80" fill={b.color} opacity="0.6" />
                    <line x1="30" y1="60" x2="30" y2="80" stroke={b.color} strokeWidth="1.5" opacity="0.5" />
                  </svg>
                </motion.button>
              ) : (
                <motion.span
                  key="word"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-xl md:text-2xl font-bold"
                  style={{ color: b.color, textShadow: `0 0 15px ${b.color}` }}
                >
                  {b.word}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Revealed message */}
      {revealed.length === BALLOONS.length && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-bold text-neon-pink text-center"
        >
          {revealed.join(" ")} 💖
        </motion.p>
      )}
    </div>
  );
};

export default BalloonStep;
