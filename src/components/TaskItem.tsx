import { formatDate } from "../utils/dateUtils";
import type { Task, TaskStatus } from "./TaskList";

export interface TaskItemProps {
    task: Task;
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onEdit:(taskId:string)=>void;
}

function TaskItem({
    task,
    onStatusChange,
    onDelete,
    onEdit,
    }: TaskItemProps) {
    const priorityColors = {
        low: "text-yellow-500",
        medium: "text-blue-500",
        high: "text-red-500",
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
            <h3 className="text-lg font-bold text-slate-900">{task.title}</h3>
            <p className="mt-2 leading-6 text-slate-600">{task.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
            <select
                value={task.status}
                onChange={(e) =>
                onStatusChange(
                    task.id,
                    e.target.value as TaskStatus
                )
                }
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
                Delete
            </button>
            <button
                onClick={() => onEdit(task.id)}
                className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
            >
                Edit
            </button>
            </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <h5 className={`rounded-full bg-slate-100 px-3 py-1 font-semibold capitalize ${priorityColors[task.priority]}`}>
            {task.priority} priority
            </h5>

            <h5 className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">Due {formatDate(task.dueDate)}</h5>
        </div>
        </div>
    );
}

export default TaskItem;