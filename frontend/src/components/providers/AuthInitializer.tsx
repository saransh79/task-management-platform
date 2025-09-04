'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { initializeAuth } from '@/store/slices/authSlice';
import { useCurrentUserQuery } from '@/lib/queries/authQueries';

export default function AuthInitializer() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  const hasToken = typeof window !== 'undefined' && !!localStorage.getItem('token');

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeAuth());
      setIsInitialized(true);
    }
  }, [dispatch, isInitialized]);

  useCurrentUserQuery(isAuthenticated && !isLoading && hasToken);

  return null;
}
