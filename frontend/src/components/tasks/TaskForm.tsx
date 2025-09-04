'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/lib/queries/taskQueries';
import { Task } from '@/types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description cannot exceed 500 characters'),
  status: z.enum(['pending', 'done']),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  onCancel: () => void;
}

export default function TaskForm({ task, onCancel }: TaskFormProps) {
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  
  const isLoading = createTaskMutation.isPending || updateTaskMutation.isPending;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || 'pending',
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task, reset]);

  const watchedTitle = watch('title');
  const watchedDescription = watch('description');

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      updateTaskMutation.mutate(
        { id: task._id, data },
        {
          onSuccess: () => {
            onCancel();
          },
        }
      );
    } else {
      createTaskMutation.mutate(data, {
        onSuccess: () => {
          onCancel();
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">
              {task ? 'Edit Task' : 'Create New Task'}
            </CardTitle>
            <button
              onClick={onCancel}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-destructive">*</span>
                </label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  {...register('title')}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {errors.title && (
                    <span className="text-destructive">{errors.title.message}</span>
                  )}
                  <span className="ml-auto">{watchedTitle?.length || 0}/100</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your task..."
                  rows={3}
                  {...register('description')}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {errors.description && (
                    <span className="text-destructive">{errors.description.message}</span>
                  )}
                  <span className="ml-auto">{watchedDescription?.length || 0}/500</span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select id="status" {...register('status')}>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                </Select>
                {errors.status && (
                  <p className="text-xs text-destructive">{errors.status.message}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="loading-spinner h-4 w-4" />
                      <span>{task ? 'Updating...' : 'Creating...'}</span>
                    </div>
                  ) : (
                    task ? 'Update Task' : 'Create Task'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
