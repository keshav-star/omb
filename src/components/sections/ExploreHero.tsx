'use client';

import { motion } from 'framer-motion';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import { Button } from '@/components/ui/button';
import { SparklesCore } from '@/components/ui/sparkles';

const words = [
  {
    text: "Discover",
  },
  {
    text: "Learn",
  },
  {
    text: "Be",
  },
  {
    text: "Inspired",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export function ExploreHero() {
  return (
    <div className="h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-20">
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      <div className="relative z-10 text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Explore Bios
        </h1>
        
        <div className="mt-4">
          <TypewriterEffect words={words} className="text-2xl md:text-4xl" />
        </div>
        
        <div className="mt-8">
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition-opacity"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Start Exploring
          </Button>
        </div>
      </div>
    </div>
  );
} 