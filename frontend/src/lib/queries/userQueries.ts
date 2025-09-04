import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export interface UserStats {
  user: {
    id: string;
    name: string;
    email: string;
    memberSince: string;
  };
  stats: {
    totalTasks: number;
    pendingTasks: number;
    completedTasks: number;
    completionRate: number;
  };
}

export const useUserStatsQuery = () => {
  return useQuery<UserStats>({
    queryKey: ['userStats'],
    queryFn: async () => {
      const response = await api.get('/auth/stats');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
