import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initializeAuth: (state) => {
      // This will be called on app start to check localStorage
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      
      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        } catch {
          // Invalid stored data, clear it
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      }
      state.isLoading = false;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
