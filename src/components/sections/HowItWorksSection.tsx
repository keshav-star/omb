import { motion } from 'framer-motion';
import { IconBook, IconHeadphones, IconVideo } from '@tabler/icons-react';

const features = [
  {
    icon: IconBook,
    title: 'Read',
    description: 'Dive into concise, well-crafted biographies that capture the essence of remarkable lives.',
  },
  {
    icon: IconHeadphones,
    title: 'Listen',
    description: 'Experience narrated bios with professional voice-overs and ambient sound design.',
  },
  {
    icon: IconVideo,
    title: 'Watch',
    description: 'Engage with visual stories featuring archival footage and modern animations.',
  },
];

const HowItWorksSection = () => {
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
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your preferred way to experience these captivating stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
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
          <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full p-1">
            <div className="bg-black rounded-full px-6 py-3">
              <p className="text-gray-300">
                <span className="text-white font-semibold">Credits</span> or{' '}
                <span className="text-white font-semibold">Lifetime Access</span> - Choose what works for you
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 