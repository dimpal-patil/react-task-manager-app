import { useState } from "react";
import TaskList from "./TaskList";
import type { Task, TaskStatus } from "./TaskList";
import TaskFilter from './TaskFilter'
import TaskForm from "./TaskForm";
import { filterTasks, sortTasks, type SortOption } from "../utils/taskUtils";
import TaskStats from "./taskStats";


function Dashboard(){
    const[search, setSearch] = useState('');
    const [filters, setFilters] = useState<{
        status?: Task["status"];
        priority?: Task["priority"];
    }>({})
    const [darkMode, setDarkMode] = useState(false);
    const [sortOption, setSortOption] = useState<SortOption>('default')
    const [editingTask, setEditingTask] = useState<Task |null>(null);
    const [tasks, setTasks] = useState<Task[]>([
        {
        id: "1", 
        title: "Task 1", 
        description: "Description 1", 
        status: "pending", 
        priority: "low", 
        dueDate: "2026-08-31"
    },
    {
        id: "2", 
        title: "Task 2", 
        description: "Description 2", 
        status: "in-progress", 
        priority: "medium", 
        dueDate: "2026-08-31"
    },
    {
        id: "3", 
        title: "Task 3", 
        description: "Description 3", 
        status: "completed", 
        priority: "high", 
        dueDate: "2026-08-31"
    },
    {
        id: "4", 
        title: "Task 4", 
        description: "Description 4", 
        status: "completed", 
        priority: "high", 
        dueDate: "2026-08-31"
    },
    ]);
    const filteredTasks = filterTasks(tasks, filters, search);
    const sortedTasks = sortTasks(filteredTasks, sortOption);

    function handleStatusChange(taskId: string, newStatus: TaskStatus) {
        setTasks((currentTasks) =>
        currentTasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        )
        );
    }

    function handleAddTask(newTask: Task) {
        setTasks((currentTasks) => [
        { ...newTask, id: newTask.id || crypto.randomUUID() },
        ...currentTasks,
        ]);
    }

    function handleDelete(taskId: string) {
        setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
        );
    }

    function handleEdit(taskId: string) {
    setEditingTask(tasks.find((task) => task.id === taskId) ?? null)
    }

    function handleUpdatedTask(updatedTask:Task){
        setTasks((currentTasks)=>
        currentTasks.map((task)=>
        task.id===updatedTask.id?updatedTask:task
        )
    );
    setEditingTask(null);
    }

    
    return(
        <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
            <div className={darkMode
                    ?"min-h-screen bg-gray-900 text-white"
                    :'min-h-screen bg-gray-50 text-gray-900'
            }>
            <div className="mx-auto max-w-6xl space-y-8">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                <header className="rounded-2xl bg-blue-500 px-6 py-8 text-white shadow-xl sm:px-10">
                    <h1 className="text-3xl text-center font-bold">
                        Task Manager
                    </h1>
                </header>
            <TaskStats tasks={tasks}
            darkMode={darkMode} />
                <TaskForm
                    key={editingTask?.id??'new'}
                    onAddTask={handleAddTask}
                    editingTask={editingTask}
                    onEditTask={handleUpdatedTask}
                />

                <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex-1">
                            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="search">
                                Search tasks
                            </label>
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                                placeholder="Search by title or description..."
                                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                            />
                        </div>
                        <TaskFilter onFilterChange={setFilters} />
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="sort">Sort by</label>
                            <select
                                id="sort"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="w-full rounded-lg border px-3 py-2.5 text-sm">
                                <option value="default">Recently added</option>
                                <option value="due-asc">Due date: earliest</option>
                                <option value="due-desc">Due date: latest</option>
                                <option value="priority-asc">Priority: low to high</option>
                                <option value="priority-desc">Priority: high to low</option>
                            </select>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Your tasks</h2>
                    </div>
                    <TaskList
                        tasks={sortedTasks}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                </section>
            </div>
        </div>
    </div>  
)
}

    export default Dashboard;