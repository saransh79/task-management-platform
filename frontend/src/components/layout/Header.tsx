"use client";

import { motion } from "framer-motion";
import { CheckSquare, LogOut, Menu, User, BarChart3 } from "lucide-react";
import { useState } from "react";

import { useLogoutMutation } from "@/lib/queries/authQueries";
import { useAppSelector } from "@/store";
import UserInsights from "@/components/modals/UserInsights";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAppSelector((state) => state.auth);
  const logoutMutation = useLogoutMutation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-primary rounded-lg">
                <CheckSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                TaskFlow
              </h1>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user?.name}
              </span>
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <button
                  onClick={() => {
                    setShowInsights(true);
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>View Insights</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {showUserMenu && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* User Insights Modal */}
      <UserInsights
        isOpen={showInsights}
        onClose={() => setShowInsights(false)}
      />
    </header>
  );
}
