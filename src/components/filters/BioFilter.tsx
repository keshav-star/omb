'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const categories = ['All', 'Scientists', 'Artists', 'Leaders', 'Innovators'];
const formats = ['Read', 'Listen', 'Watch'];
const moods = ['Inspiring', 'Educational', 'Entertaining', 'Thought-provoking'];

export function BioFilter() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFormat, setActiveFormat] = useState('Read');
  const [activeMood, setActiveMood] = useState('Inspiring');

  return (
    <div className="mb-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Format</h3>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <motion.button
                key={format}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFormat === format
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                onClick={() => setActiveFormat(format)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {format}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Mood</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeMood === mood
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
                onClick={() => setActiveMood(mood)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
} 