'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface StorySection {
  title: string;
  content: string;
  image: string;
  quote: string;
}

interface Story {
  earlyLife: StorySection;
  journey: StorySection;
  impact: StorySection;
}

interface BioStoryPanelProps {
  story: Story;
}

export default function BioStoryPanel({ story }: BioStoryPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sections = [
    { key: 'earlyLife', data: story.earlyLife },
    { key: 'journey', data: story.journey },
    { key: 'impact', data: story.impact },
  ];

  return (
    <div ref={containerRef} className="relative">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {sections.map(({ key, data }, index) => (
          <motion.div
            key={key}
            className="min-w-full snap-center"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
              {/* Image Section */}
              <motion.div
                className="relative h-[400px] rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Content Section */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold"
                >
                  {data.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-300 leading-relaxed"
                >
                  {data.content}
                </motion.p>

                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="border-l-4 border-white/30 pl-4 italic text-gray-200"
                >
                  "{data.quote}"
                </motion.blockquote>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
        />
      </div>
    </div>
  );
} 