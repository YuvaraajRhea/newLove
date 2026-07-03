import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GalleryStepProps {
  onNext: () => void;
}

const MEMORIES = [
  { id: 1, caption: "My beautiful queen 💕", image: "/images/memory-1.jpg" },
  { id: 2, caption: "That adorable face I adore 😘", image: "/images/memory-2.jpg" },
  { id: 3, caption: "Always stunning, always confident 💫", image: "/images/memory-3.jpg" },
  { id: 4, caption: "That smile that melts my heart 🥰", image: "/images/memory-4.jpg" },
  { id: 5, caption: "Yuvaraaj & Rhea — forever ❤️", image: "/images/memory-5.png" },
];

const GalleryStep = ({ onNext }: GalleryStepProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onNext();
    }
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const memory = MEMORIES[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10"
      >
        💝 Sweet Moments 💝
      </motion.h2>

      <div className="relative w-full max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={memory.id}
            initial={{ rotate: -5, opacity: 0, x: 100 }}
            animate={{ rotate: 0, opacity: 1, x: 0 }}
            exit={{ rotate: 5, opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="bg-foreground rounded-lg p-3 pb-16 shadow-2xl mx-auto"
            style={{ maxWidth: 280 }}
          >
            {/* Polaroid photo area */}
            <div className="w-full aspect-square bg-muted rounded overflow-hidden">
              <img src={memory.image} alt={memory.caption} className="w-full h-full object-cover" />
            </div>
            {/* Caption */}
            <p className="text-center mt-4 font-body text-sm text-background font-semibold">
              {memory.caption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 mt-8">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-display disabled:opacity-30 transition-opacity"
        >
          ← Prev
        </button>
        <span className="text-muted-foreground text-sm">
          {currentIndex + 1} / {MEMORIES.length}
        </span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-display neon-glow-pink"
        >
          {currentIndex === MEMORIES.length - 1 ? "Next →" : "Next →"}
        </motion.button>
      </div>
    </div>
  );
};

export default GalleryStep;
