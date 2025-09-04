"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "@/components/layout/Header";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";
import Pagination from "@/components/tasks/Pagination";
import { useAppSelector, useAppDispatch } from "@/store";
import { setFilters } from "@/store/slices/taskSlice";
import { useTasksQuery } from "@/lib/queries/taskQueries";
import { useDebounce } from "@/hooks/useDebounce";
import { Task } from "@/types";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const { tasks, pagination, filters } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchInput, setSearchInput] = useState(filters.search);

  const debouncedSearch = useDebounce(searchInput, 500);

  const { isLoading: isLoadingTasks } = useTasksQuery();

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setFilters({ search: debouncedSearch, page: 1 }));
    }
  }, [debouncedSearch, filters.search, dispatch]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const handleSearchChange = (search: string) => {
    setSearchInput(search);
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

  // Show loading state while auth is being initialized
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <TaskFilters
        search={searchInput}
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
