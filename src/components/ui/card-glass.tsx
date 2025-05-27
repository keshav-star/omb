'use client';

import { cn } from '@/lib/utils';

interface CardGlassProps {
  children: React.ReactNode;
  className?: string;
}

export function CardGlass({ children, className }: CardGlassProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20',
        className
      )}
    >
      {children}
    </div>
  );
} 