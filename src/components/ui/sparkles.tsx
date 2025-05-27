'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export function SparklesCore({
  id = 'tsparticles',
  background = 'transparent',
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  className = '',
  particleColor = '#FFFFFF',
}: SparklesCoreProps) {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: particleDensity }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);

    return () => clearInterval(interval);
  }, [maxSize, minSize, particleDensity]);

  return (
    <div
      id={id}
      className={className}
      style={{
        background,
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            backgroundColor: particleColor,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
} 