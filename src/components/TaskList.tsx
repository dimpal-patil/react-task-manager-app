import TaskItem from "./TaskItem";
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
}

export interface TaskListProps {
    tasks: Task[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
    onDelete: (taskId: string) => void;
    onEdit:(taskId:string)=>void;
}

function TaskList({
    tasks,
    onStatusChange,
    onDelete,
    onEdit,
}: TaskListProps) {
    return (
    <div className="space-y-4">
    {tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="font-semibold text-slate-700">No tasks found</p>
            <p className="mt-1 text-sm text-slate-500">Create a task above or adjust your filters.</p>
        </div>
    )}
    {tasks.map((task) => (
        <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
        />
        ))}
    </div>
    );
}


export default TaskList;