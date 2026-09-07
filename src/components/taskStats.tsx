import type { Task } from "./TaskList";


interface TaskStatsProps{
    tasks:Task[];
}

function TaskStats({tasks}:TaskStatsProps){
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(
        (task) => task.status ==='pending'
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status ==='in-progress'
    ).length;
    
    const completedTasks = tasks.filter(
        (task) => task.status ==='completed'

    ).length;

    const stats = [
        { label: 'Total tasks', value: totalTasks, color: 'border-slate-400' },
        { label: 'Pending', value: pendingTasks, color: 'border-amber-400' },
        { label: 'In progress', value: inProgressTasks, color: 'border-blue-400' },
        { label: 'Completed', value: completedTasks, color: 'border-emerald-400' },
    ];

    return(
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className={`rounded-xl border-2 ${stat.color} bg-white p-5 shadow-sm`}>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
            ))}
        </div>
    )
}

export default TaskStats;