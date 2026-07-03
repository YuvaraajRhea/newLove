import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EnvelopeStepProps {
  onNext: () => void;
}

const EnvelopeStep = ({ onNext }: EnvelopeStepProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-center"
          >
            <p className="font-display text-xl md:text-2xl text-foreground mb-8">
              You've got mail! 💌
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => setOpened(true)}
              className="text-9xl cursor-pointer select-none"
            >
              💌
            </motion.button>
            <p className="text-muted-foreground mt-6">Tap to open!</p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-lg w-full"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 neon-border">
              <p className="font-script text-neon-pink text-3xl md:text-4xl text-center mb-6">
                Happy 23rd Birthday, Rhea!
              </p>

              <div className="space-y-4 font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                <p>
                  You deserve all the happiness, love, and smiles in the world. 🌸
                </p>
                <p>
                  You have this special way of making everything around you brighter. 
                  Your laugh, your kindness, your beautiful soul — they light up my world 
                  every single day. ✨
                </p>
                <p>
                  I hope your day is filled with laughter and moments that make your 
                  heart happy. You are the most amazing person I know, and I'm so grateful 
                  to have you in my life. 💖
                </p>
              </div>

              <div className="mt-8 text-right">
                <p className="font-display text-lg text-muted-foreground">With all my love,</p>
                <p className="font-script text-3xl text-neon-purple mt-1">Yuvaraaj</p>
              </div>

              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNext}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold neon-glow-pink"
                >
                  One more surprise! 🎁
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnvelopeStep;
