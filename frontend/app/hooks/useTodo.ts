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
        reload: loadTodos,

        pendingTodos,
        completedTodos,

        totalCount: todos.length,
        pendingCount: pendingTodos.length,
        completedCount: completedTodos.length,
        completionRate,
    };
}