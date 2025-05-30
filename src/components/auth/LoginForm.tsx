'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/lib/store/auth';
import { BackgroundBeams } from '@/components/ui/background-beams';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to login');
      }

      setUser(result.user);
      router.push('/profile');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during login');
    }
  };

  return (
    <div className="relative">
      <BackgroundBeams />
      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 space-y-6 bg-black/50 backdrop-blur-sm border border-white/10">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your account</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-500 text-sm text-center">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Email"
                  className="bg-black/50 border-white/10"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className="bg-black/50 border-white/10"
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full"
                disabled
                onClick={() => {/* TODO: Implement Google OAuth */}}
              >
                Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled
                onClick={() => {/* TODO: Implement GitHub OAuth */}}
              >
                GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <motion.a
                href="/auth/signup"
                className="text-white hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign up
              </motion.a>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 