'use client';
import { motion } from 'framer-motion';
import { IconHeart, IconList, IconUser, IconCoins } from '@tabler/icons-react';

const features = [
  {
    icon: IconHeart,
    title: 'Favorites',
    description: 'Save your favorite bios for quick access and create personalized collections.',
  },
  {
    icon: IconList,
    title: 'Custom Lists',
    description: 'Organize bios into custom lists based on themes, interests, or any category you choose.',
  },
  {
    icon: IconUser,
    title: 'Profile',
    description: 'Track your reading history, manage preferences, and customize your experience.',
  },
  {
    icon: IconCoins,
    title: 'Credit System',
    description: 'Flexible credit system to access bios on-demand or get lifetime access.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            User Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get the most out of your One Minute Bio experience with these powerful features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Create Your Account
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 