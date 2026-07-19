"use client";

import { CircleCheckBig, SquarePen, Trash2, ClipboardList, Check } from "lucide-react";
import { Todo, todoService } from "@/app/services/todo.service";
import EmptyContainer from "../EmptyContainer";
import { toast } from "react-toastify";
import { useState } from "react";

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

    const [selectedStatus, setSelectedStatus] = useState("all");
    const [search, setSearch] = useState("");

    const todoDisplay = todos.filter((todo) => {
        if (selectedStatus === "complete" && !todo.completed) return false;
        if (selectedStatus === "pending" && todo.completed) return false;

        if (search.trim() !== "") {
            const searchLower = search.toLowerCase().trim();
            const titleMatch = todo.title.toLowerCase().includes(searchLower);
            const descriptionMatch = todo.description?.toLowerCase().includes(searchLower) || false;

            return titleMatch || descriptionMatch;
        }

        return true;
    });

    function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedStatus(e.target.value);
    };

    function handleSearch(newSearch: React.ChangeEvent<HTMLInputElement>) {
        setSearch(newSearch.target.value);
    };

    const handleCompleteAll = async () => {
        try {
            await todoService.completeAll();
            toast.success("Todas as tarefas foram concluídas!");
        } catch (error) {
            toast.error("Erro ao concluir todas as tarefas");
            console.error(error);
        }
    };

    return (
        <div>
            <div className="mt-16 flex items-center justify-between">

                <div className="flex gap-2.5">
                    <input
                        id="text"
                        type="text"
                        required
                        placeholder="Pesquisat tarefa"
                        className="px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none"
                        value={search}
                        onChange={handleSearch}
                    />

                    <select
                        id="status"
                        className="px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none cursor-pointer"
                        onChange={handleFilter}
                    >
                        <option value="all">Todos as tarefas</option>
                        <option value="complete">Concluídas</option>
                        <option value="pending">Pendentes</option>
                    </select>
                </div>

                <button
                    onClick={handleCompleteAll}
                    className="px-5 py-2 flex items-center gap-2 rounded-lg bg-(--green-500) text-sm font-medium text-white transition-all hover:bg-green-700 cursor-pointer"
                >
                    <Check size={18} />
                    Concluir tudo
                </button>
            </div>


            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
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
                            {todoDisplay.map((todo) => (
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
        </div>
    );
}