import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import Fireworks from "@/components/Fireworks";
import CountdownStep from "@/components/brithday/CountdownStep";
import WelcomeStep from "@/components/brithday/WelcomeStep";
import CakeStep from "@/components/brithday/CakeStep";
import BalloonStep from "@/components/brithday/BalloonStep";
import GalleryStep from "@/components/brithday/GalleryStep";
import EnvelopeStep from "@/components/brithday/EnvelopeStep";
import FinalGiftStep from "@/components/brithday/FinalGiftStep";


type Step = "countdown" | "welcome" | "cake" | "balloons" | "gallery" | "envelope" | "gift";

const STEPS: Step[] = ["countdown", "welcome", "cake", "balloons", "gallery", "envelope", "gift"];

const Index = () => {
  const [step, setStep] = useState<Step>("countdown");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/background-music.mp3");
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicPlaying((p) => !p);
  }, [musicPlaying]);

  const goTo = useCallback((s: Step) => setStep(s), []);
  const nextStep = useCallback(() => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }, [step]);

  const replay = useCallback(() => setStep("countdown"), []);

  return (
    <div className="min-h-screen gradient-bg overflow-x-hidden relative">
      <FloatingHearts />
      <Fireworks />

      {/* Music toggle */}
      {step !== "countdown" && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-lg neon-border"
          onClick={toggleMusic}
          title={musicPlaying ? "Pause music" : "Play music"}
        >
          {musicPlaying ? "🔊" : "🔇"}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === "countdown" && <CountdownStep onComplete={() => goTo("welcome")} />}
          {step === "welcome" && <WelcomeStep onNext={nextStep} />}
          {step === "cake" && <CakeStep onNext={nextStep} />}
          {step === "balloons" && <BalloonStep onNext={nextStep} />}
          {step === "gallery" && <GalleryStep onNext={nextStep} />}
          {step === "envelope" && <EnvelopeStep onNext={nextStep} />}
          {step === "gift" && <FinalGiftStep onReplay={replay} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
