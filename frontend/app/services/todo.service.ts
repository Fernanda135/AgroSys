import api from "./api";


export interface Todo {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTodoData {
    title: string;
    description?: string;
}

export interface UpdateTodoData {
    title?: string;
    description?: string;
    completed?: boolean;
}

export interface TodoResponse {
    success: boolean;
    message: string;
    data: Todo[];
    stats?: {
        total: number;
        completed: number;
        pending: number;
    };
}

export interface SingleTodoResponse {
    success: boolean;
    message: string;
    data: Todo;
}

export interface DeleteTodoResponse {
    success: boolean;
    message: string;
}

export interface TodoStats {
    total: number;
    completed: number;
    pending: number;
}


export const todoService = {

    async getAll(params?: {
        page?: number;
        limit?: number;
        completed?: boolean;
        search?: string;
    }) {
        const { data } = await api.get<TodoResponse>("/todos", { params });
        return data;
    },

    async getById(id: number) {
        const { data } = await api.get<SingleTodoResponse>(`/todos/${id}`);
        return data;
    },

    async create(todo: CreateTodoData) {
        const { data } = await api.post<SingleTodoResponse>("/todos", todo);
        return data;
    },

    async update(id: number, todo: UpdateTodoData) {
        const { data } = await api.put<SingleTodoResponse>(`/todos/${id}`, todo);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete<DeleteTodoResponse>(`/todos/${id}`);
        return data;
    },

    async toggleStatus(id: number) {
        const { data } = await api.patch<SingleTodoResponse>(`/todos/${id}/toggle`);
        return data;
    },

    async getPending() {
        const { data } = await api.get<TodoResponse>("/todos?completed=false");
        return data;
    },

    async getCompleted() {
        const { data } = await api.get<TodoResponse>("/todos?completed=true");
        return data;
    },

    async getStats() {
        const response = await todoService.getAll();
        if (response.success && response.stats) {
            return response.stats;
        }
        return { total: 0, completed: 0, pending: 0 };
    },

    async search(query: string) {
        const { data } = await api.get<TodoResponse>(`/todos?search=${encodeURIComponent(query)}`);
        return data;
    },

    async completeAll() {
        const { data } = await api.patch<{ success: boolean; message: string; count: number }>("/todos/complete-all");
        return data;
    },

    async deleteCompleted() {
        const { data } = await api.delete<{ success: boolean; message: string; count: number }>("/todos/delete-completed");
        return data;
    }
};