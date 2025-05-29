'use client';

import { motion } from 'framer-motion';

interface Button {
  text: string;
  onClick: () => void;
}

interface CallToActionProps {
  title: string;
  description: string;
  primaryButton: Button;
  secondaryButton: Button;
}

export default function CallToAction({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CallToActionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
      
      {/* Content */}
      <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={primaryButton.onClick}
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
            >
              {primaryButton.text}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={secondaryButton.onClick}
              className="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
            >
              {secondaryButton.text}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 