import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300), // Question 1
      setTimeout(() => setPhase(2), 2000), // Question 2
      setTimeout(() => setPhase(3), 3800), // Outro starts
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF6EC]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full bg-[#F2784B]/10 blur-[100px]"
          animate={{ x: ['-20%', '20%', '-20%'], y: ['-20%', '10%', '-20%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-8">
        <div className="h-[20vh] flex items-end justify-center mb-8">
          <motion.h1
            className="text-[5vw] font-bold text-[#2A2A3D] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            Tired of waiting <span className="text-[#F2784B]">weeks</span><br />
            for a grooming slot?
          </motion.h1>
        </div>

        <div className="h-[20vh] flex items-start justify-center">
          <motion.h2
            className="text-[4vw] font-bold text-[#6FB89A] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            Or driving across town<br />
            just to get your pup pampered?
          </motion.h2>
        </div>
      </div>
    </motion.div>
  );
}
