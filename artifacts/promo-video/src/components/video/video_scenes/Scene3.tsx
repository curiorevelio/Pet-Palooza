import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300), // Coffee
      setTimeout(() => setPhase(2), 1000), // Phone
      setTimeout(() => setPhase(3), 1500), // Text
      setTimeout(() => setPhase(4), 4500), // Outro
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-[#F2784B]"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-[60vw] h-[60vw] bg-[#FFF6EC]/20 rounded-full blur-[60px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[80vw] justify-between items-center">
        <div className="relative w-[30vw] h-[40vw]">
          <motion.img
            src={`${import.meta.env.BASE_URL}images/coffee.png`}
            className="absolute -left-10 top-[20%] w-[25vw] object-contain drop-shadow-2xl"
            initial={{ opacity: 0, x: -50, rotate: -20 }}
            animate={phase >= 1 ? { opacity: 1, x: 0, rotate: -10 } : { opacity: 0, x: -50, rotate: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          <motion.img
            src={`${import.meta.env.BASE_URL}images/phone.png`}
            className="absolute right-0 top-0 w-[20vw] object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: 100, rotate: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0, rotate: 10 } : { opacity: 0, y: 100, rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </div>

        <div className="w-[45vw]">
          <motion.h1
            className="text-[5vw] font-bold text-[#FFF6EC] leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, x: 50 }}
            animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            Sip your coffee.
            <br />
            <span className="text-[#2A2A3D]">We've got the rest.</span>
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
}
