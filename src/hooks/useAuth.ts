import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth';
import type { LoginFormData, SignupFormData } from '@/lib/validations/auth';

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Login failed');
  }

  return result;
};

const signupUser = async (data: SignupFormData): Promise<AuthResponse> => {
  const response = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Signup failed');
  }

  return result;
};

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
      router.push('/explore');
    },
  });
}

export function useSignup() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      setUser(data.user);
      router.push('/explore');
    },
  });
} 