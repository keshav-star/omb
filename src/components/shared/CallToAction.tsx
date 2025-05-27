'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
}: CallToActionProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-8 md:p-12">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h2>
        
        <motion.p
          className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href={buttonLink}>
            <motion.button
              className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {buttonText}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 