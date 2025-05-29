'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconPlayerPlay, IconVolume } from '@tabler/icons-react';

interface MediaItem {
  id: number;
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
}

interface Media {
  videos: MediaItem[];
  audio: MediaItem[];
}

interface BioMediaProps {
  media: Media;
}

export default function BioMedia({ media }: BioMediaProps) {
  const [activeTab, setActiveTab] = useState<'videos' | 'audio'>('videos');
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-2 rounded-full ${
            activeTab === 'videos'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white'
          }`}
        >
          Videos
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('audio')}
          className={`px-6 py-2 rounded-full ${
            activeTab === 'audio'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white'
          }`}
        >
          Audio
        </motion.button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {media[activeTab].map((mediaItem) => (
          <motion.div
            key={mediaItem.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="relative group cursor-pointer"
            onClick={() => setActiveItem(mediaItem)}
          >
            <div className="aspect-video rounded-lg overflow-hidden bg-white/10">
              {mediaItem.thumbnail ? (
                <img
                  src={mediaItem.thumbnail}
                  alt={mediaItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconVolume size={48} className="text-white/50" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                {activeTab === 'videos' ? (
                  <IconPlayerPlay
                    size={48}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <IconVolume
                    size={48}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">{mediaItem.title}</h3>
              {mediaItem.duration && (
                <p className="text-sm text-gray-400">{mediaItem.duration}</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Media Player Modal */}
      {activeItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {activeTab === 'videos' ? (
              <video
                src={activeItem.url}
                controls
                className="w-full aspect-video"
                autoPlay
              />
            ) : (
              <audio
                src={activeItem.url}
                controls
                className="w-full p-4"
                autoPlay
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{activeItem.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 