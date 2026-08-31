import React, { useState } from "react";
import type { Task, TaskStatus } from "./TaskList";

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



    function validateForm(): boolean {
        const validationErrors: FormErrors = {};

        if (!title.trim()) {
            validationErrors.title = 'Title should not be empty';
        }

        if (!description.trim()) {
            validationErrors.description = 'Description should not be empty';
        }

        if (!dueDate) {
            validationErrors.dueDate = 'Due date should not be empty';
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validateForm()) {
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
        setErrors({});
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='titleInput'>Title: </label>
                <input
                    type='text'
                    id='titleInput'
                    value={title}
                    onChange={(e) => {setErrors({}); setTitle(e.target.value);}}
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div>
                <label htmlFor='descriptionInput'>Description: </label>
                <input
                    type='text'
                    id='descriptionInput'
                    value={description}
                    onChange={(e) => {setErrors({}); setDescription(e.target.value);}}
                />
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            <div>
                <label htmlFor='statusInput'>Status:</label>
                <select
                    id='statusInput'
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                    <option value='pending'>Pending</option>
                    <option value='in-progress'>In Progress</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>

            <div>
                <label htmlFor='priorityInput'>Priority:</label>
                <select
                    id='priorityInput'
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                >
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>
            </div>

            <div>
                <label htmlFor='dueDateInput'>DueDate: </label>
                <input
                    type='date'
                    id='dueDateInput'
                    value={dueDate}
                    onChange={(e) => {setErrors({}); setDueDate(e.target.value)}}
                />
                {errors.dueDate && <p className="text-red-500">{errors.dueDate}</p>}
            </div>

            <button type='submit' 
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                {editingTask ? "Update Task" : "Add Task"}
            </button>
        </form>
    );
};

export default TaskForm;