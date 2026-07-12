"use client";

import { CircleCheckBig, SquarePen, Trash2, ClipboardList } from "lucide-react";
import { Todo } from "@/app/services/todo.service";
import EmptyContainer from "../EmptyContainer";

interface TodoTableProps {
    todos: Todo[];
    onComplete: (id: number) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: number) => void;
}

export default function TodoTable({
    todos,
    onComplete,
    onEdit,
    onDelete
}: TodoTableProps) {
    if (todos.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-lg">
                <EmptyContainer
                    title="Nehuma tarefa encontrada"
                    description='Clique em "Adicionar Tarefa" para começar'
                    icon={<ClipboardList className="text-(--green-500)" size={52} />}
                />
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Título
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Descrição
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {todos.map((todo) => (
                            <tr
                                key={todo.id}
                                className={`transition-colors hover:bg-gray-50 ${todo.completed ? "bg-gray-50/50" : ""
                                    }`}
                            >
                                <td
                                    className={`px-6 py-4 text-sm ${todo.completed
                                        ? "text-gray-400 line-through"
                                        : "font-medium text-gray-900"
                                        }`}
                                >
                                    {todo.title}
                                </td>
                                <td
                                    className={`px-6 py-4 text-sm ${todo.completed ? "text-gray-400" : "text-gray-600"
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
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onComplete(todo.id)}
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
                                            onClick={() => onEdit(todo)}
                                            className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                            title="Editar tarefa"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(todo.id)}
                                            className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                            title="Excluir tarefa"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}