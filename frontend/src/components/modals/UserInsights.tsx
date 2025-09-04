"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { UserStats, useUserStatsQuery } from "@/lib/queries/userQueries";
import { useAppSelector } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Loader2,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

interface UserInsightsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserInsights({ isOpen, onClose }: UserInsightsProps) {
  const { user } = useAppSelector((state) => state.auth);
  const { data: userStats, isLoading, error } = useUserStatsQuery();

  const stats = (userStats as UserStats)?.stats || {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completionRate: 0,
  };

  const insights = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 "
          >
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Insights
                    </h2>
                    <p className="text-sm text-gray-500">
                      Task performance and productivity analytics
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {isLoading && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="text-gray-600">
                        Loading your insights...
                      </span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="p-3 bg-red-100 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                        <X className="h-6 w-6 text-red-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Failed to load insights
                      </h3>
                      <p className="text-gray-600 mb-4">
                        We couldn&apos;t fetch your task statistics. Please try
                        again.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                )}

                {!isLoading && !error && (
                  <>
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Welcome back,{" "}
                        {(userStats as UserStats)?.user?.name || user?.name}!
                      </h3>
                      <p className="text-gray-600">
                        Here&apos;s how you&apos;re doing with your tasks.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {insights.map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${insight.bgColor}`}
                              >
                                <insight.icon
                                  className={`h-5 w-5 ${insight.color}`}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">
                                  {insight.title}
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                  {insight.value}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary rounded-lg">
                          <Target className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900">
                            Keep up the great work!
                          </h5>
                          <p className="text-sm text-gray-600">
                            {stats.completionRate >= 70
                              ? "You're doing excellent! Your completion rate is impressive."
                              : stats.completionRate >= 50
                              ? "You're making good progress. Keep pushing forward!"
                              : "Every task completed is a step forward. You've got this!"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
