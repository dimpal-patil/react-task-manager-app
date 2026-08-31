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
        <div className="rounded-lg border p-4 shadow">
        <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{task.title}</h3>

            <div className="flex items-center gap-2">
            <select
                value={task.status}
                onChange={(e) =>
                onStatusChange(
                    task.id,
                    e.target.value as TaskStatus
                )
                }
                className="rounded border px-2 py-1"
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <button
                onClick={() => onDelete(task.id)}
                className="rounded bg-red-500 px-2 py-1 text-white"
            >
                Delete
            </button>
            <button
                onClick={() => onEdit(task.id)}
                className="rounded bg-red-500 px-2 py-1 text-white"
            >
                Edit
            </button>
            </div>
        </div>

        <p>{task.description}</p>

        <div className="flex gap-6">
            <h5 className={priorityColors[task.priority]}>
            Priority: {task.priority}
            </h5>

            <h5>Due: {task.dueDate}</h5>
        </div>
        </div>
    );
}

export default TaskItem;