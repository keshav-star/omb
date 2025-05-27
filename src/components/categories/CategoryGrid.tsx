'use client';

import { motion } from 'framer-motion';
import { CardGlass } from '@/components/ui/card-glass';
import { HoverCard } from '@/components/ui/hover-card';
import { CategoryCard } from './CategoryCard';

const categories = [
  {
    id: 1,
    name: 'Scientists',
    icon: '🔬',
    description: 'Discover the minds that shaped our understanding of the world',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Artists',
    icon: '🎨',
    description: 'Explore the lives of creative visionaries who changed art forever',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'Leaders',
    icon: '👑',
    description: 'Learn about the visionaries who shaped nations and movements',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 4,
    name: 'Innovators',
    icon: '💡',
    description: 'Meet the pioneers who transformed technology and business',
    color: 'from-green-500 to-emerald-500',
  },
];

export function CategoryGrid() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        Explore Categories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: category.id * 0.1 }}
          >
            <HoverCard>
              <CategoryCard category={category} />
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 