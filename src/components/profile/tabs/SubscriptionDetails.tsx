'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/store/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconCrown, IconStar, IconDiamond } from '@tabler/icons-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    credits: 5,
    features: [
      'Basic bio generation',
      '5 credits per month',
      'Standard support',
    ],
    icon: IconStar,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    credits: 50,
    features: [
      'Advanced bio generation',
      '50 credits per month',
      'Priority support',
      'Custom templates',
    ],
    icon: IconCrown,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$29.99',
    credits: 200,
    features: [
      'Premium bio generation',
      '200 credits per month',
      '24/7 support',
      'Custom templates',
      'API access',
      'Team management',
    ],
    icon: IconDiamond,
  },
];

export function SubscriptionDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const currentPlan = plans.find((plan) => plan.id === user?.planType) || plans[0];

  const handleUpgrade = async (planId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/v1/user/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to upgrade subscription');
      }

      setUser(result.user);
    } catch (error) {
      console.error('Subscription upgrade failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-black/50 backdrop-blur-sm border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Current Plan</h2>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <currentPlan.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{currentPlan.name}</h3>
            <p className="text-gray-400">
              {currentPlan.credits} credits per month
            </p>
          </div>
        </div>
      </Card>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <p className="text-red-500 text-sm">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === user?.planType;
          const isUpgrade = plan.credits > (currentPlan.credits || 0);

          return (
            <Card
              key={plan.id}
              className={`p-6 bg-black/50 backdrop-blur-sm border ${
                isCurrentPlan
                  ? 'border-purple-500'
                  : 'border-white/10 hover:border-purple-500/50'
              } transition-colors`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <plan.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-400"
                  >
                    <span className="mr-2">•</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <Button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isLoading || isCurrentPlan || !isUpgrade}
                className={`w-full ${
                  isCurrentPlan
                    ? 'bg-gray-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                }`}
              >
                {isCurrentPlan
                  ? 'Current Plan'
                  : isUpgrade
                  ? 'Upgrade'
                  : 'Downgrade'}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 