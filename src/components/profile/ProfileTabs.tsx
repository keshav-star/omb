'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconUser, IconCreditCard, IconHeart, IconClock, IconSettings } from '@tabler/icons-react';
import { ProfileInfo } from './tabs/ProfileInfo';
import { SubscriptionDetails } from './tabs/SubscriptionDetails';
import { MyFavorites } from './tabs/MyFavorites';
import { BioRequests } from './tabs/BioRequests';
import { Settings } from './tabs/Settings';

const tabs = [
  {
    id: 'profile',
    label: 'Profile',
    icon: IconUser,
    component: ProfileInfo,
  },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: IconCreditCard,
    component: SubscriptionDetails,
  },
  {
    id: 'favorites',
    label: 'My Favorites',
    icon: IconHeart,
    component: MyFavorites,
  },
  {
    id: 'requests',
    label: 'Bio Requests',
    icon: IconClock,
    component: BioRequests,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: IconSettings,
    component: Settings,
  },
];

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex space-x-1 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (activeTab !== tab.id) return null;
            const Component = tab.component;

            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Component />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
} 