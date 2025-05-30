'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import { IconUser, IconHeart, IconFileText, IconLogout } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UserDropdownProps {
  onClose: () => void;
}

export function UserDropdown({ onClose }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(true);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuItems = [
    {
      label: 'Profile',
      icon: IconUser,
      href: '/profile',
    },
    {
      label: 'My Favorites',
      icon: IconHeart,
      href: '/profile?tab=favorites',
    },
    {
      label: 'Requests',
      icon: IconFileText,
      href: '/profile?tab=requests',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-72"
        >
          <Card className="p-4 bg-black/50 backdrop-blur-sm border border-white/10">
            {/* Credits Box */}
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-white/10">
              <p className="text-sm text-gray-400">Available Credits</p>
              <p className="text-2xl font-bold text-white">{user?.credits || 0}</p>
              <p className="text-sm text-gray-400">{user?.planType || 'Free Plan'}</p>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <IconLogout className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 