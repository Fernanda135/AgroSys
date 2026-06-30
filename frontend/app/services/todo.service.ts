import api from "./api";

export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    user_id: number;
}

export const todoService = {
    async getAll() {
        const { data } = await api.get<Todo[]>("/todos");
        return data;
    },

    async create(todo: {
        title: string;
        description: string;
    }) {
        const { data } = await api.post("/todos", todo);
        return data;
    },

    async update(
        id: number,
        todo: Partial<{
            title: string;
            description: string;
            completed: boolean;
        }>
    ) {
        const { data } = await api.put(`/todos/${id}`, todo);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete(`/todos/${id}`);
        return data;
    },
};