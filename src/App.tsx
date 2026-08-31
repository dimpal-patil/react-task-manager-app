import { useState } from "react";
import TaskList from "./components/TaskList";
import type { Task, TaskStatus } from "./components/TaskList";
import TaskFilter from './components/TaskFilter'
import TaskForm from "./components/TaskForm";
import { filterTasks, type SortOption } from "./utils/taskUtils";


function App(){
  const[search, setSearch] = useState('');
  const [filters, setFilters] = useState<{
    status?: Task["status"];
    priority?: Task["priority"];
  }>({})
 
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
  }
  
  return(
    <div className="min-h-screen">
      <h1 className="text-center font-bold text-3xl">
        Task Manager App
      </h1>
    <TaskForm 
    key={editingTask?.id??'new'}
    onAddTask={handleAddTask}
    editingTask={editingTask}
    onEditTask={handleUpdatedTask}
    />

    <label>Search Tasks</label>
    <input
    type='text'
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    placeholder="Search Tasks..."/>
    <TaskFilter
      onFilterChange={setFilters}
    />
    <div className="mt-6 w-full"> 
    <TaskList
      tasks={filterTasks(tasks, filters, search)}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
    </div>
    </div> 
  )
}

export default App;