"use client";

import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";

import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block space-y-6"
        >
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <CheckSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TaskFlow</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Organize your work and life, finally.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Become focused, organized, and calm with TaskFlow. The
              world&apos;s #1 task manager and to-do list app.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-600">
                Create and organize tasks effortlessly
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-600">
                Track your progress with beautiful insights
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-gray-600">Stay focused and productive</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="p-2 bg-primary rounded-lg">
                  <CheckSquare className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            <LoginForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
