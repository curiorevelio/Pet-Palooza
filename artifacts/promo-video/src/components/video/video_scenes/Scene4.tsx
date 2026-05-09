import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300), // Logo
      setTimeout(() => setPhase(2), 1000), // Text
      setTimeout(() => setPhase(3), 1800), // CTA
      setTimeout(() => setPhase(4), 3800), // Outro
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF6EC]"
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: '0%' }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        className="w-[20vw] h-[20vw] object-contain mb-8 drop-shadow-xl"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />

      <motion.h1
        className="text-[6vw] font-bold text-[#2A2A3D] mb-12"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        PawHub
      </motion.h1>

      <motion.div
        className="bg-[#2A2A3D] text-[#FFF6EC] px-12 py-6 rounded-full shadow-2xl"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={phase >= 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-[3vw] font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          Download today
        </span>
      </motion.div>
    </motion.div>
  );
}
