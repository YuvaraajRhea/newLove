import { motion } from "framer-motion";

const LoveLetter = () => {
  return (
    <section id="letter" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border-glow"
        >
          <p className="font-script text-gold text-3xl md:text-4xl text-center mb-8">
            My Dearest Rhea,
          </p>

          <div className="space-y-6 font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              From the moment you walked into my life, everything changed. The world became 
              more colorful, my heart found its rhythm, and I discovered what it truly means to love.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              You are my sunshine on cloudy days, my calm in every storm, and the 
              most beautiful soul I've ever known. I fall in love with you more deeply 
              with every passing moment.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              I promise to cherish you, to hold your hand through every chapter of life, 
              and to build a world full of love, laughter, and endless happiness — 
              together, forever.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2 }}
            className="mt-10 text-right"
          >
            <p className="font-script text-2xl text-gradient-rose">
              Forever Yours,
            </p>
            <p className="font-script text-3xl text-gradient-gold mt-2">
              Yuvaraaj
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
