'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconHeart, IconTrash, IconCopy, IconShare } from '@tabler/icons-react';

interface FavoriteBio {
  id: string;
  content: string;
  createdAt: string;
  category: string;
}

export function MyFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteBio[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'professional', name: 'Professional' },
    { id: 'social', name: 'Social' },
    { id: 'creative', name: 'Creative' },
  ];

  const handleRemoveFavorite = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/v1/user/favorites/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to remove favorite');
      }

      setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error('Remove favorite failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast notification here
  };

  const handleShare = async (bio: FavoriteBio) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Bio',
          text: bio.content,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        handleCopyToClipboard(bio.content);
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const filteredFavorites = selectedCategory === 'all'
    ? favorites
    : favorites.filter((fav) => fav.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={`whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-black/50 border-white/10'
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-500 text-sm">{error}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {filteredFavorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <IconHeart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-400">
              Save your favorite bios here for quick access
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFavorites.map((bio) => (
              <motion.div
                key={bio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <Card className="p-6 bg-black/50 backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                      {bio.category}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(bio.id)}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <IconTrash className="w-5 h-5" />
                    </Button>
                  </div>

                  <p className="text-gray-300 mb-4 line-clamp-3">{bio.content}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {new Date(bio.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyToClipboard(bio.content)}
                        className="text-gray-400 hover:text-purple-500"
                      >
                        <IconCopy className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(bio)}
                        className="text-gray-400 hover:text-purple-500"
                      >
                        <IconShare className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 