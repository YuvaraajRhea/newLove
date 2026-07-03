import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CakeStepProps {
  onNext: () => void;
}

const Confetti = () => {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: ['#ff69b4', '#9b59b6', '#3498db', '#f1c40f', '#e74c3c', '#2ecc71'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 2,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

const CakeStep = ({ onNext }: CakeStepProps) => {
  const [decorated, setDecorated] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLight = () => {
    setCandleLit(true);
    setShowConfetti(true);
    setTimeout(() => onNext(), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          🎂 Your Birthday Cake! 🎂
        </h2>

        {/* Cake */}
        <div className="relative mx-auto mb-10" style={{ width: 220, height: 260 }}>
          {/* Candle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            {candleLit && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-2xl mb-0"
              >
                🔥
              </motion.div>
            )}
            <div className="w-3 h-12 bg-neon-yellow rounded-full" />
          </div>

          {/* Top layer */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-16 bg-kawaii-pink rounded-xl border-2 border-accent/50">
            {decorated && (
              <div className="absolute inset-0 flex items-center justify-center gap-1 text-sm">
                🌸✨🌸✨🌸
              </div>
            )}
          </div>

          {/* Middle layer */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-52 h-16 bg-neon-purple rounded-xl border-2 border-primary/50">
            {decorated && (
              <div className="absolute inset-0 flex items-center justify-center gap-1 text-sm">
                💖🎀💖🎀💖🎀
              </div>
            )}
          </div>

          {/* Bottom layer */}
          <div className="absolute top-36 left-1/2 -translate-x-1/2 w-56 h-20 bg-primary rounded-xl border-2 border-accent/50">
            {decorated && (
              <div className="absolute inset-0 flex items-center justify-center text-lg font-display text-primary-foreground font-bold">
                Happy 23rd! 🎉
              </div>
            )}
          </div>

          {/* Plate */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-6 bg-muted rounded-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!decorated && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDecorated(true)}
              className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-display font-semibold neon-glow-pink"
            >
              🎨 Decorate!
            </motion.button>
          )}

          {decorated && !candleLit && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLight}
              className="px-6 py-3 rounded-full bg-neon-yellow text-primary-foreground font-display font-semibold"
              style={{ boxShadow: '0 0 20px hsl(50, 100%, 65%, 0.5)' }}
            >
              🕯️ Light the Candle!
            </motion.button>
          )}

          {candleLit && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-neon-pink font-display font-semibold animate-neon-pulse"
            >
              🎉 Make a wish, Rhea! 🎉
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CakeStep;
