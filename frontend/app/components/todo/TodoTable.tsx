"use client";

import { CircleCheckBig, SquarePen, Trash2, ClipboardList } from "lucide-react";
import { Todo } from "@/app/services/todo.service";
import EmptyContainer from "../EmptyContainer";

interface TodoTableProps {
    todos: Todo[];
    onComplete?: (id: number) => void;
    onEdit?: (todo: Todo) => void;
    onDelete?: (id: number) => void;
    showActions?: boolean;
}

export default function TodoTable({
    todos,
    onComplete,
    onEdit,
    onDelete,
    showActions = true
}: TodoTableProps) {
    if (todos.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-lg">
                <EmptyContainer
                    title="Nenhuma tarefa encontrada"
                    description='Clique em "Adicionar Tarefa" para começar'
                    icon={<ClipboardList size={52} />}
                />
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-(--gray-2) bg-(--gray)">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                Título
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                Descrição
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                Status
                            </th>
                            {showActions && (
                                <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                    Ações
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--gray)">
                        {todos.map((todo) => (
                            <tr
                                key={todo.id}
                                className={`transition-colors hover:bg-gray-50 ${todo.completed ? "bg-gray-50/50" : ""
                                    }`}
                            >
                                <td
                                    className={`px-6 py-4 text-sm ${todo.completed
                                        ? "text-(--gray-2) line-through"
                                        : "font-medium text-(--black)"
                                        }`}
                                >
                                    {todo.title}
                                </td>
                                <td
                                    className={`px-6 py-4 text-sm ${todo.completed ? "text-(--gray-2)" : "text-(--black)"
                                        }`}
                                >
                                    {todo.description}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${todo.completed
                                            ? "bg-(--green-50) text-(--green-500)"
                                            : "bg-yellow-100 text-(--warning)"
                                            }`}
                                    >
                                        {todo.completed ? "Concluída" : "Pendente"}
                                    </span>
                                </td>
                                {showActions && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onComplete?.(todo.id)}
                                                disabled={todo.completed}
                                                className={`rounded-lg p-2 transition-all cursor-pointer ${todo.completed
                                                    ? "cursor-not-allowed text-gray-300"
                                                    : "text-(--green-500) hover:bg-green-50 hover:text-green-900"
                                                    }`}
                                                title="Concluir tarefa"
                                            >
                                                <CircleCheckBig size={20} />
                                            </button>
                                            <button
                                                onClick={() => onEdit?.(todo)}
                                                className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                                title="Editar tarefa"
                                            >
                                                <SquarePen size={20} />
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(todo.id)}
                                                className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                                title="Excluir tarefa"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}