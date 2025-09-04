"use client";

import { motion } from "framer-motion";
import {
  CheckCircle,
  Circle,
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import {
  useDeleteTaskMutation,
  useToggleTaskMutation,
} from "@/lib/queries/taskQueries";
import { formatDate } from "@/lib/utils";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const deleteTaskMutation = useDeleteTaskMutation();
  const toggleTaskMutation = useToggleTaskMutation();

  const handleToggle = () => {
    toggleTaskMutation.mutate(task._id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(task._id);
    }
    setShowMenu(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <button
                onClick={handleToggle}
                className="mt-1 text-gray-400 hover:text-primary transition-colors"
              >
                {task.status === "done" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`text-sm font-medium ${
                    task.status === "done"
                      ? "text-gray-500 line-through"
                      : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    task.status === "done"
                      ? "text-gray-400 line-through"
                      : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>

                <div className="flex items-center space-x-3 mt-3">
                  <Badge
                    variant={task.status === "done" ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {task.status === "done" ? "Completed" : "Pending"}
                  </Badge>

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(task.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-md hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                >
                  <button
                    onClick={() => {
                      onEdit(task);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Edit className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    disabled={deleteTaskMutation.isPending}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>
                      {deleteTaskMutation.isPending ? "Deleting..." : "Delete"}
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showMenu && (
        <div className="fixed inset-0 z-5" onClick={() => setShowMenu(false)} />
      )}
    </motion.div>
  );
}
