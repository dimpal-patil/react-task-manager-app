import type { Task } from "../components/TaskList";

type TaskFilters = {
    status?: Task['status'];
    priority?: Task['priority'];
};

export function filterTasks(tasks: Task[], filters: TaskFilters, search: string): Task[] {
    return tasks.filter((task) => {
        const searchMatches =
            !search ||
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase());

        let filterMatches = true;

        if (filters.status && filters.priority) {
            filterMatches =
                task.status === filters.status ||
                task.priority === filters.priority;
        } else if (filters.status) {
            filterMatches = task.status === filters.status;
        } else if (filters.priority) {
            filterMatches = task.priority === filters.priority;
        }

        return searchMatches && filterMatches;
    });
}

export type SortOption = 
| 'default'
| 'due-asc'
| 'due-desc'
| 'priority-asc'
| 'priority-desc';

const priorityOrder= {
    low: 1,
    medium: 2,
    high: 3,
};


export function sortTasks(tasks: Task[], sortOption: SortOption): Task[] {
    const sortedTasks = [...tasks];

    if(sortOption==='default'){
        return tasks;
    }
    else if(sortOption==='priority-asc'){
        sortedTasks.sort(
            (a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
    }
    else if(sortOption ==='priority-desc'){
        sortedTasks.sort(
            (a,b)=>priorityOrder[b.priority] - priorityOrder[a.priority]
        );
    }
    else if(sortOption==='due-asc'){
        sortedTasks.sort(
            (a,b) =>
                new Date(a.dueDate).getTime()-new Date(b.dueDate).getTime()
        );
    }
    else if (sortOption === "due-desc") {
    sortedTasks.sort(
        (a, b) =>
            new Date(b.dueDate).getTime() -
            new Date(a.dueDate).getTime()
    );
    }
    return sortedTasks;
    }
