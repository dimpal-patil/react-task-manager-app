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