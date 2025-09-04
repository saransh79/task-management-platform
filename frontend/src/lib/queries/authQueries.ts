import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authAPI } from '@/lib/api';
import { useAppDispatch } from '@/store';
import { setCredentials, clearCredentials } from '@/store/slices/authSlice';
import { clearTasks } from '@/store/slices/taskSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch(setCredentials({ user: data.user, token: data.token }));
      
      toast.success('Login successful!');
      router.push('/dashboard');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
    },
  });
};

export const useRegisterMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      dispatch(setCredentials({ user: data.user, token: data.token }));
      
      toast.success('Account created successfully!');
      router.push('/dashboard');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      dispatch(clearCredentials());
      dispatch(clearTasks());
      
      return Promise.resolve();
    },
    onSuccess: () => {
      toast.success('Logged out successfully');
      router.push('/login');
    },
  });
};

export const useCurrentUserQuery = (enabled = true) => {
  const dispatch = useAppDispatch();

  const query = useQuery({
    queryKey: ['currentUser'],
    queryFn: authAPI.getMe,
    enabled,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(setCredentials({ user: query.data.user, token }));
      }
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(clearCredentials());
    }
  }, [query.error, dispatch]);

  return query;
};
