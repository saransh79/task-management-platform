'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Plus } from 'lucide-react';

import TaskCard from './TaskCard';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onCreateTask: () => void;
  isLoading?: boolean;
}

export default function TaskList({
  tasks,
  onEdit,
  onCreateTask,
  isLoading = false,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <CheckSquare className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Get started by creating your first task or adjust your search filters.
          </p>
          <Button onClick={onCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Task
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onEdit}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
