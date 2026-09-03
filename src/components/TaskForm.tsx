import React, { useState } from "react";
import type { Task, TaskStatus } from "./TaskList";
import { validateForm } from "../utils/validationUtils";

interface TaskProps {
    onAddTask: (newTask: Task) => void;
    editingTask: Task | null;
    onEditTask: (task:Task) => void;
}

interface FormErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}
type Priority = 'low' | 'medium' | 'high';

function TaskForm({onAddTask, editingTask, onEditTask}:TaskProps){
    const [title, setTitle] =  useState(editingTask?.title ?? '');
    const [description, setDescription] = useState(editingTask?.description??'');
    const [status, setStatus] = useState(editingTask?.status??'pending');
    const [priority, setPriority] = useState(editingTask?.priority??'low');
    const [dueDate, setDueDate] = useState(editingTask?.dueDate??'')
    const[errors, setErrors] = useState<FormErrors>({})
    const today = new Date().toISOString().split("T")[0];

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const validationErrors = validateForm(
        title,
        description,
        dueDate
        );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }

        const taskToSave: Task = editingTask
            ? {
                ...editingTask,
                title,
                description,
                status,
                priority,
                dueDate,
            }
            : {
                id: Date.now().toString(),
                title,
                description,
                status,
                priority,
                dueDate,
            };

        if (editingTask) {
            onEditTask(taskToSave);
        } else {
            onAddTask(taskToSave);
        }

        setTitle('');
        setDescription('');
        setStatus('pending');
        setPriority('low');
        setDueDate('');

    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{editingTask ? "Edit task" : "Create a task"}</h2>
                    <p className="mt-1 text-sm text-slate-500">Add the details you need to make progress.</p>
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor='titleInput'>Title</label>
                <input
                    type='text'
                    id='titleInput'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        setErrors((prev)=>({
                            ...prev,
                            title:undefined,
                        }));
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor='descriptionInput'>Description</label>
                <input
                    type='text'
                    id='descriptionInput'
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value)
                        setErrors((prev)=>({
                            ...prev,
                            description:undefined,
                        }));
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor='statusInput'>Status</label>
                <select
                    id='statusInput'
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                >
                    <option value='pending'>Pending</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor='priorityInput'>Priority</label>
                <select
                    id='priorityInput'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                >
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor='dueDateInput'>Due date</label>
                <input
                    type='date'
                    id='dueDateInput'
                    value={dueDate}
                    min={today}
                    onChange={(e) => {
                        setDueDate(e.target.value);
                        setErrors((prev)=>({
                            ...prev,
                            dueDate:undefined
                        }));
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                />
                {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
            </div>

            <button type='submit'
            className="mt-1 w-full rounded-lg bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 md:col-span-2">
                {editingTask ? "Update Task" : "Add Task"}
            </button>
            </div>
        </form>
    );
};

export default TaskForm;