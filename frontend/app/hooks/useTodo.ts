import { useEffect, useMemo, useState } from "react";
import { Todo, todoService } from "@/app/services/todo.service";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadTodos() {
        try {
            setLoading(true);
            const data = await todoService.getAll();
            setTodos(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar tarefas.");
        } finally {
            setLoading(false);
        }
    }

    async function addTodo(data: { title: string; description: string }) {
        try {
            const newTodo = await todoService.create({
                title: data.title,
                description: data.description,
            });
            setTodos((prev) => [newTodo, ...prev]);
            return newTodo;
        } catch (err) {
            console.error(err);
            setError("Erro ao criar tarefa.");
            throw err;
        }
    }

    async function updateTodo(id: number, data: { title: string; description: string }) {
        try {
            const updatedTodo = await todoService.update(id, {
                title: data.title,
                description: data.description,
            });
            setTodos((prev) =>
                prev.map((todo) => (todo.id === id ? updatedTodo : todo))
            );
            return updatedTodo;
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar tarefa.");
            throw err;
        }
    }

    async function toggleTodo(id: number) {
        try {
            const todo = todos.find((t) => t.id === id);
            if (!todo) throw new Error("Tarefa não encontrada");

            const updatedTodo = await todoService.update(id, {
                completed: !todo.completed,
            });
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? updatedTodo : t))
            );
            return updatedTodo;
        } catch (err) {
            console.error(err);
            setError("Erro ao alternar status da tarefa.");
            throw err;
        }
    }

    async function deleteTodo(id: number) {
        try {
            await todoService.delete(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error(err);
            setError("Erro ao deletar tarefa.");
            throw err;
        }
    }


    useEffect(() => {
        loadTodos();
    }, []);


    const pendingTodos = useMemo(
        () => todos.filter(todo => !todo.completed),
        [todos]
    );

    const completedTodos = useMemo(
        () => todos.filter(todo => todo.completed),
        [todos]
    );

    const completionRate = useMemo(() => {
        if (todos.length === 0) return 0;
        return Math.round((completedTodos.length / todos.length) * 100);
    }, [todos.length, completedTodos.length]);

    return {
        todos,
        setTodos,
        loading,
        error,
        
        addTodo,
        updateTodo,
        toggleTodo,
        deleteTodo,
        reload: loadTodos,
        
        pendingTodos,
        completedTodos,
        
        totalCount: todos.length,
        pendingCount: pendingTodos.length,
        completedCount: completedTodos.length,
        completionRate,
    };
}