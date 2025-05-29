'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { useAuthStore } from '@/lib/store/auth';
import { BackgroundBeams } from '@/components/ui/background-beams';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement actual login logic here
      // For now, we'll simulate a successful login
      setUser({
        id: '1',
        name: 'Test User',
        email: data.email,
      });
      router.push('/explore');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black relative">
      <BackgroundBeams />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
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
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
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
    </main>
  );
};

export default LoginPage; 