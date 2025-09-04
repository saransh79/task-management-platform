"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import Header from "@/components/layout/Header";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import Pagination from "@/components/tasks/Pagination";
import { useAppSelector, useAppDispatch } from "@/store";
import { setFilters } from "@/store/slices/taskSlice";
import { useTasksQuery } from "@/lib/queries/taskQueries";
import { Task } from "@/types";

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { tasks, pagination, filters } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { isLoading: isLoadingTasks } = useTasksQuery();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setFilters({ page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search, dispatch]);

  const handleSearchChange = (search: string) => {
    dispatch(setFilters({ search, page: 1 }));
  };

  const handleStatusChange = (status: string) => {
    dispatch(
      setFilters({ status: status as "all" | "pending" | "done", page: 1 })
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(setFilters({ page }));
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleFormCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <TaskFilters
        search={filters.search}
        status={filters.status}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCreateTask={handleCreateTask}
      />

      <main className="flex-1 pb-20">
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onCreateTask={handleCreateTask}
          isLoading={isLoadingTasks}
        />
      </main>

      {tasks.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalTasks={pagination.totalTasks}
            hasNextPage={pagination.hasNextPage}
            hasPrevPage={pagination.hasPrevPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <AnimatePresence>
        {showTaskForm && (
          <TaskForm
            task={editingTask || undefined}
            onCancel={handleFormCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
