import { useEffect, useMemo, useState } from "react";
import { Todo, todoService } from "@/app/services/todo.service";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadTodos() {
        try {
            setLoading(true);
            const response = await todoService.getAll();

            if (response.success) {
                setTodos(response.data);
                setError(null);
            } else {
                setError("Erro ao carregar tarefas");
            }
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao carregar tarefas.");
            }
        } finally {
            setLoading(false);
        }
    }

    async function addTodo(data: { title: string; description?: string }) {
        try {
            const response = await todoService.create({
                title: data.title,
                description: data.description || "",
            });

            if (response.success) {
                setTodos((prev) => [response.data, ...prev]);
                return response;
            }
            throw new Error(response.message || "Erro ao criar tarefa");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao criar tarefa.");
            }

            throw err;
        }
    }

    async function updateTodo(id: number, data: { title?: string; description?: string }) {
        try {
            const response = await todoService.update(id, {
                title: data.title,
                description: data.description,
            });

            if (response.success) {
                setTodos((prev) =>
                    prev.map((todo) => (todo.id === id ? response.data : todo))
                );
                return response;
            }
            throw new Error(response.message || "Erro ao atualizar tarefa");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao atualizar tarefa.");
            }

            throw err;
        }
    }

    async function toggleTodo(id: number) {
        try {
            const response = await todoService.toggleStatus(id);

            if (response.success) {
                setTodos((prev) =>
                    prev.map((t) => (t.id === id ? response.data : t))
                );
                return response;
            }
            throw new Error(response.message || "Erro ao alternar status");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao alternar status da tarefa.");
            }

            throw err;
        }
    }

    async function deleteTodo(id: number) {
        try {
            const response = await todoService.delete(id);
            if (response.success) {
                setTodos((prev) => prev.filter((todo) => todo.id !== id));
                return response;
            }

            throw new Error(response.message || "Erro ao deletar tarefa");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao deletar tarefa.");
            }

            throw err;
        }
    }

    async function completeAllTodos() {
        try {
            const response = await todoService.completeAll();

            if (response.success) {
                setTodos(prev =>
                    prev.map(todo => ({ ...todo, completed: true }))
                );
                return response;
            }

            throw new Error(response.message || "Erro ao concluir todas as tarefas");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao concluir todas as tarefas.");
            }

            throw err;
        }
    }

    async function deleteCompleted() {
        try {
            const response = await todoService.deleteCompleted();

            if (response.success) {
                setTodos(prev => prev.filter(todo => !todo.completed));
                return response;
            }

            throw new Error(response.message || "Erro ao excluir tarefas concluídas");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao excluir tarefas concluídas.");
            }

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
        completeAllTodos,
        deleteCompleted,
        reload: loadTodos,

        pendingTodos,
        completedTodos,

        totalCount: todos.length,
        pendingCount: pendingTodos.length,
        completedCount: completedTodos.length,
        completionRate,
    };
}