import { useMemo } from 'react';
import { Todo } from '@/app/services/todo.service';

export function useTodoFilters(todos: Todo[]) {
    const pendingTodos = useMemo(() => {
        return todos.filter(todo => !todo.completed);
    }, [todos]);

    const completedTodos = useMemo(() => {
        return todos.filter(todo => todo.completed);
    }, [todos]);

    const completionRate = useMemo(() => {
        if (todos.length === 0) return 0;
        return (completedTodos.length / todos.length) * 100;
    }, [todos, completedTodos]);

    return {
        pendingTodos,
        completedTodos,
        pendingCount: pendingTodos.length,
        completedCount: completedTodos.length,
        totalCount: todos.length,
        completionRate
    };
}