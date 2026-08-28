import { useState } from "react";
import TaskList from "./components/TaskList";
import type { Task, TaskStatus } from "./components/TaskList";
import TaskFilter from './components/TaskFilter'


function App(){
  const [filters, setFilters] = useState<{
    status?: Task["status"];
    priority?: Task["priority"];
  }>({})
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1", 
      title: "Task 1", 
      description: "Description 1", 
      status: "pending", 
      priority: "low", 
      dueDate: "8/31/2026"
    },
    {
      id: "2", 
      title: "Task 2", 
      description: "Description 2", 
      status: "in-progress", 
      priority: "medium", 
      dueDate: "8/30/2026"
    },
    {
      id: "3", 
      title: "Task 3", 
      description: "Description 3", 
      status: "completed", 
      priority: "high", 
      dueDate: "8/29/2026"
    },
    {
      id: "4", 
      title: "Task 4", 
      description: "Description 4", 
      status: "completed", 
      priority: "high", 
      dueDate: "8/31/2026"
    },
  ]);
  const filteredTasks = tasks.filter((task) => {
  // No filters selected → show everything
  if (!filters.status && !filters.priority) {
    return true;
  }

  // Both filters selected → match either one
  if (filters.status && filters.priority) {
    return (
      task.status === filters.status ||
      task.priority === filters.priority
    );
  }

  // Only status selected
  if (filters.status) {
    return task.status === filters.status;
  }

  // Only priority selected
  if (filters.priority) {
    return task.priority === filters.priority;
  }

  return true;
});

  function handleStatusChange(taskId: string, newStatus: TaskStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleDelete(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  return(
    <div className="min-h-screen">
      <h1 className="text-center font-bold text-3xl">
        Task Manager App
      </h1>

    <TaskFilter
      onFilterChange={setFilters}
    />
    <div className="mt-6 w-full"> 
    <TaskList
      tasks={filteredTasks}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
    </div>
    </div> 
  )
}

export default App;