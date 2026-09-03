import { useState } from "react";
import type { TaskStatus } from "./TaskList";

export interface TaskFilterProps {
    onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    }) => void;
}

type Priority = 'low' | 'medium' | 'high'

function TaskFilter({onFilterChange}:TaskFilterProps){
    const [status, setStatus] = useState<TaskStatus | undefined>(undefined)
    const [priority, setPriority] = useState<'low' | 'medium' | 'high' | undefined>(undefined)

    return(
        <div className="flex flex-col gap-4 sm:flex-row">
            <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
                <select
                    onChange={(e) => {
                        const newStatus = e.target.value === 'all'
                            ? undefined
                            : e.target.value as TaskStatus;
                        setStatus(newStatus);
                        onFilterChange({ status: newStatus, priority });
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm">
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Priority</label>
                <select
                    onChange={(e) => {
                        const newPriority = e.target.value === 'all'
                            ? undefined
                            : e.target.value as Priority;
                        setPriority(newPriority);
                        onFilterChange({ status, priority: newPriority });
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
                >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
        </div>
    )
}

export default TaskFilter;
