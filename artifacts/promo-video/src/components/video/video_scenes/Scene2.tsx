import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300), // Reveal groomer
      setTimeout(() => setPhase(2), 800), // Reveal text
      setTimeout(() => setPhase(3), 1800), // Reveal 10 min
      setTimeout(() => setPhase(4), 4500), // Outro
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] bg-[#6FB89A]"
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 max-w-[40vw]">
        <motion.h1
          className="text-[4.5vw] font-bold text-[#FFF6EC] leading-tight mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, x: -40 }}
          animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          With PawHub, top-rated groomers & pros come to you.
        </motion.h1>

        <motion.div
          className="inline-block bg-[#F2784B] text-[#FFF6EC] px-8 py-4 rounded-full"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={phase >= 3 ? { opacity: 1, scale: 1, rotate: -5 } : { opacity: 0, scale: 0.5, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <span className="text-[3.5vw] font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            In just 10 minutes.
          </span>
        </motion.div>
      </div>

      <div className="relative w-[40vw] h-[40vw]">
        <motion.div
          className="absolute inset-0 bg-[#FFF6EC] rounded-full"
          initial={{ scale: 0 }}
          animate={phase >= 1 ? { scale: 1 } : { scale: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/groomer.png`}
          className="absolute inset-0 w-full h-full object-contain p-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}
