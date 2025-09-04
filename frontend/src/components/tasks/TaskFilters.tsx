"use client";

import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface TaskFiltersProps {
  search: string;
  status: string;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onCreateTask: () => void;
}

export default function TaskFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
  onCreateTask,
}: TaskFiltersProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2 min-w-0">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="min-w-[120px]"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="done">Completed</option>
              </Select>
            </div>
          </div>

          <Button onClick={onCreateTask} className="w-full sm:w-auto">
            Create Task
          </Button>
        </div>
      </div>
    </div>
  );
}
