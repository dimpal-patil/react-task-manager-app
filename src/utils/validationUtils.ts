
export interface FormErrors {
    title?: string;
    description?: string;
    dueDate?: string;
}

export function validateForm(title: string, description: string, dueDate: string): FormErrors {
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

    return validationErrors;
}