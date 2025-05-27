'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}

export function TypewriterEffect({
  words,
  className,
}: TypewriterEffectProps) {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    };
  });

  return (
    <div className={cn('flex space-x-1 my-6', className)}>
      {wordsArray.map((word, idx) => {
        return (
          <div key={`word-${idx}`} className="flex">
            {word.text.map((char, index) => (
              <motion.span
                key={`char-${index}`}
                className={cn('text-white', word.className)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                }}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        );
      })}
    </div>
  );
} 