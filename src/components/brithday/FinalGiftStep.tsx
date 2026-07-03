import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FinalGiftStepProps {
  onReplay: () => void;
}

const FinalGiftStep = ({ onReplay }: FinalGiftStepProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-center"
          >
            <p className="font-display text-xl md:text-2xl text-foreground mb-8">
              A special gift for you! 🎀
            </p>
            <motion.button
              onClick={() => setOpened(true)}
              className="text-[120px] md:text-[150px] cursor-pointer select-none block mx-auto"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.9 }}
            >
              🎁
            </motion.button>
            <p className="text-muted-foreground mt-4 animate-neon-pulse">Tap the gift!</p>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="text-center max-w-lg"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🎉🥳🎉
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-neon-pink mb-4">
              Happy 23rd Birthday
            </h1>
            <p className="font-script text-5xl md:text-7xl text-neon-purple mb-6">
              Rhea!
            </p>

            <p className="text-foreground/80 text-lg mb-4 font-body">
              You make the world a more beautiful place just by being in it. 💖
            </p>

            {/* Video */}
            <div className="rounded-2xl overflow-hidden neon-glow-pink mb-8 mx-auto max-w-md">
              <video
                controls
                className="w-full aspect-video bg-muted"
              >
                <source src="/video/birthday-video.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/video/birthday-video.mp4"
                download="Happy-Birthday-Rhea.mp4"
                className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-display text-lg font-semibold neon-glow-pink inline-block"
              >
                ⬇️ Download Video
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onReplay}
                className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-display text-lg font-semibold neon-glow-pink"
              >
                🔄 Replay the Surprise!
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinalGiftStep;
