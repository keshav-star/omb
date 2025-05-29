'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Bio {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
}

interface BioCardProps {
  bio: Bio;
}

export function BioCard({ bio }: BioCardProps) {
  return (
    <Link href={`/bio/${bio?.name?.toLowerCase().replace(/\s+/g, '-')}`}>
      <motion.div
        className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm p-4"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={bio.image}
            alt={bio.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2 text-white">
            <span className="text-sm font-medium bg-black/30 px-2 py-1 rounded">
              {bio.category}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white">{bio.name}</h3>
        <p className="text-sm text-gray-300 mb-4">{bio.description}</p>

        <div className="flex flex-wrap gap-2">
          {bio.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/10 text-white px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
        >
          <span className="text-sm font-medium text-white">Read More →</span>
        </motion.div>
      </motion.div>
    </Link>
  );
} 