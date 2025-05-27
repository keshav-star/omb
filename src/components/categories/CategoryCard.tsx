'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/explore/${category?.name?.toLowerCase()}`}>
      <motion.div
        className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${category.color} text-white cursor-pointer`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        <div className="relative z-10">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-sm opacity-90">{category.description}</p>
          
          <motion.div
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0, x: 20 }}
            whileHover={{ opacity: 1, x: 0 }}
          >
            <span className="text-sm font-medium">Explore →</span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
} 