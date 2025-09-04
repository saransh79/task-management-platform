"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckSquare, Users, Shield, Zap } from "lucide-react";

import RegisterForm from "@/components/forms/RegisterForm";
import { useAppSelector } from "@/store";

export default function RegisterPage() {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
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
              Join millions of users who trust TaskFlow
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Start your journey to better productivity and organization today.
              It&apos;s free to get started.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Users className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold text-gray-900">
                  Team Collaboration
                </h3>
                <p className="text-sm text-gray-600">
                  Work together seamlessly
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Shield className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold text-gray-900">
                  Secure & Private
                </h3>
                <p className="text-sm text-gray-600">Your data is protected</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <Zap className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Optimized for speed</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg shadow-sm">
                <CheckSquare className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-semibold text-gray-900">Easy to Use</h3>
                <p className="text-sm text-gray-600">Intuitive interface</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
