'use client';

import { motion } from 'framer-motion';
import { CardGlass } from '@/components/ui/card-glass';
import { BioCard } from './BioCard';

const trendingBios = [
  {
    id: 1,
    name: 'Albert Einstein',
    category: 'Scientists',
    image: '/images/einstein.jpg',
    description: 'The father of modern physics who revolutionized our understanding of space and time.',
    tags: ['Physics', 'Nobel Prize', 'Theory of Relativity'],
  },
  {
    id: 2,
    name: 'Frida Kahlo',
    category: 'Artists',
    image: '/images/kahlo.jpg',
    description: 'A revolutionary artist who transformed pain into powerful self-portraits.',
    tags: ['Painting', 'Mexican Art', 'Self-Portrait'],
  },
  {
    id: 3,
    name: 'Marie Curie',
    category: 'Scientists',
    image: '/images/curie.jpg',
    description: 'The first woman to win a Nobel Prize and the only person to win in two different fields.',
    tags: ['Physics', 'Chemistry', 'Radioactivity'],
  },
  {
    id: 4,
    name: 'Steve Jobs',
    category: 'Innovators',
    image: '/images/jobs.jpg',
    description: 'A visionary who transformed personal computing and mobile technology.',
    tags: ['Technology', 'Apple', 'Innovation'],
  },
];

export function TrendingBios() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Trending Bios
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingBios.map((bio, index) => (
          <motion.div
            key={bio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={index % 2 === 0 ? 'md:mt-8' : ''}
          >
            <CardGlass>
              <BioCard bio={bio} />
            </CardGlass>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 