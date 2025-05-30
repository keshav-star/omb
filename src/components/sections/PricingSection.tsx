import { motion } from 'framer-motion';
import { IconCheck } from '@tabler/icons-react';

const pricingPlans = [
  {
    name: 'Lifetime Access',
    price: {
      inr: '₹200',
      usd: '$10',
    },
    description: 'Unlimited access to all bios, forever.',
    features: [
      'Access to all current bios',
      'Access to all future bios',
      'Priority support',
      'Early access to new features',
      'No credit system',
    ],
    popular: true,
  },
  {
    name: 'Credit Pack',
    price: {
      inr: '₹100',
      usd: '$5',
    },
    description: '20 credits to use on any bio.',
    features: [
      '20 credits',
      'Use on any bio',
      'Credits never expire',
      'Mix of read/listen/watch',
      'Flexible usage',
    ],
    popular: false,
  },
];

interface PricingSectionProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const PricingSection = ({scrollRef}: PricingSectionProps) => {
  return (
    <section ref={scrollRef} className="py-20 bg-black relative overflow-hidden" id='pricing-section'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose the plan that best fits your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">{plan.price.inr}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-2xl text-gray-400">{plan.price.usd}</span>
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-300">
                      <IconCheck className="w-5 h-5 text-purple-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 