'use client';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'symbol' | 'full';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ variant = 'full', className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const Symbol = () => (
    <svg
      viewBox="0 0 100 100"
      className={`${sizeClasses[size]} ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Clock hands */}
      <path
        d="M50 50 L50 30"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 50 L65 50"
        stroke="url(#gradient)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Profile silhouette */}
      <path
        d="M50 35 C45 35 40 40 40 45 C40 55 45 60 50 60 C55 60 60 55 60 45 C60 40 55 35 50 35 Z"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M35 65 C35 55 65 55 65 65"
        stroke="url(#gradient)"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (variant === 'symbol') {
    return <Symbol />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3"
    >
      <Symbol />
      <span className={`font-bold ${textSizes[size]} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
        One Minute Bio
      </span>
    </motion.div>
  );
};

export default Logo; 