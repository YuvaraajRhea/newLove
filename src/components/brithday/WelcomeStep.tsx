import { motion } from "framer-motion";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-lg"
      >
        {/* Cute cat/panda character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-8xl md:text-9xl mb-8"
        >
          🐱
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          A Cutiepie was born today!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl md:text-2xl text-neon-pink font-semibold mb-2"
        >
          Yes, it's YOU, <span className="font-script text-3xl md:text-4xl">Rhea!</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-muted-foreground text-lg mb-10"
        >
          A little surprise awaits... ✨
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display text-lg font-semibold neon-glow-pink hover:brightness-110 transition-all"
        >
          🎀 Start the Surprise 🎀
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
