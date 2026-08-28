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
}

function TaskList({
    tasks,
    onStatusChange,
    onDelete,
}: TaskListProps) {
    return (
    <div className="space-y-4">
        <h2>Task List component</h2>

        {tasks.map((task) => (
        <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
        />
        ))}
    </div>
    );
}


export default TaskList;