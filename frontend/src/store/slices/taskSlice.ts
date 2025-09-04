import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalTasks: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    status: 'all' | 'pending' | 'done';
    page: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {
    search: '',
    status: 'all',
    page: 1,
  },
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ tasks: Task[]; pagination: { currentPage: number; totalPages: number; totalTasks: number; hasNextPage: boolean; hasPrevPage: boolean } }>) => {
      state.tasks = action.payload.tasks;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
      state.error = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
      state.pagination.totalTasks += 1;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
      state.pagination.totalTasks -= 1;
    },
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<TaskState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearTasks: (state) => {
      state.tasks = [];
      state.currentTask = null;
      state.pagination = initialState.pagination;
      state.filters = initialState.filters;
      state.error = null;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setCurrentTask,
  setFilters,
  setLoading,
  setError,
  clearTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
