import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { tasksAPI } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store';
import { setTasks, addTask, updateTask, removeTask, setError } from '@/store/slices/taskSlice';
import { toast } from 'sonner';

// Get tasks query
export const useTasksQuery = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.tasks.filters);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const params = {
    page: filters.page,
    limit: 10,
    ...(filters.status !== 'all' && { status: filters.status }),
    ...(filters.search && { search: filters.search }),
  };

  const query = useQuery({
    queryKey: ['tasks', params],
    queryFn: () => tasksAPI.getTasks(params),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (query.data) {
      dispatch(setTasks({ tasks: query.data.tasks, pagination: query.data.pagination }));
    }
  }, [query.data, dispatch]);

  useEffect(() => {
    if (query.error) {
      const message = (query.error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch tasks';
      dispatch(setError(message));
      toast.error(message);
    }
  }, [query.error, dispatch]);

  return query;
};

export const useTaskQuery = (id: string, enabled = true) => {
  const query = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksAPI.getTask(id),
    enabled: enabled && !!id,
  });

  useEffect(() => {
    if (query.error) {
      const message = (query.error as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to fetch task';
      toast.error(message);
    }
  }, [query.error]);

  return query;
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: tasksAPI.createTask,
    onSuccess: (data) => {
      dispatch(addTask(data.task));
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      toast.success('Task created successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Failed to create task';
      toast.error(message);
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<{ title: string; description: string; status: string }> }) => tasksAPI.updateTask(id, data),
    onSuccess: (data) => {
      dispatch(updateTask(data.task));
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.task._id] });
      
      toast.success('Task updated successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: tasksAPI.deleteTask,
    onSuccess: (_, taskId) => {
      dispatch(removeTask(taskId));
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      toast.success('Task deleted successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
    },
  });
};

export const useToggleTaskMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: tasksAPI.toggleTask,
    onMutate: async (taskId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData(['tasks']);
      
      // Optimistically update the task status in cache
      queryClient.setQueryData(['tasks'], (old: { tasks: Array<{ _id: string; status: string }> }) => {
        if (!old) return old;
        
        return {
          ...old,
          tasks: old.tasks.map((task) =>
            task._id === taskId
              ? { ...task, status: task.status === 'pending' ? 'done' : 'pending' }
              : task
          ),
        };
      });
      
      return { previousTasks };
    },
    onSuccess: (data) => {
      // Update Redux store with server response
      dispatch(updateTask(data.task));
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      toast.success(`Task marked as ${data.task.status}!`);
    },
    onError: (error: { response?: { data?: { message?: string } } }, _, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
      
      const message = error.response?.data?.message || 'Failed to update task status';
      toast.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
