'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function BackgroundBeams() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      container.style.setProperty('--mouse-x', `${x}`);
      container.style.setProperty('--mouse-y', `${y}`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        '--mouse-x': '0.5',
        '--mouse-y': '0.5',
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
    </div>
  );
} 