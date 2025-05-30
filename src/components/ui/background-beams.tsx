'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beamsRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = beamsRef.current!.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      beamsRef.current!.style.setProperty('--x', x.toString());
      beamsRef.current!.style.setProperty('--y', y.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        'absolute inset-0 overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/20 before:to-pink-500/20 before:opacity-0 before:transition-opacity before:duration-500',
        'after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_calc(var(--x,0.5)*100%)_calc(var(--y,0.5)*100%),rgba(255,255,255,0.1),transparent_50%)]',
        className
      )}
    />
  );
}; 