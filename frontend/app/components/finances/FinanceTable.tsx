"use client";

import { BanknoteArrowDown, BanknoteArrowUp, SquarePen, Trash2 } from "lucide-react";

import { Finance } from "@/app/services/finance.service";
import EmptyContainer from "../EmptyContainer";
import { formatCurrency } from "@/app/utils/currency";
import { formatDate } from "@/app/utils/date";

interface FinanceTableProps {
    finances: Finance[];
    onEdit: (finance: Finance) => void;
    onDelete: (id: number) => void;
    showActions?: boolean;
}

export default function FinanceTable({
    finances,
    onEdit,
    onDelete,
    showActions = true
}: FinanceTableProps) {
    if (finances.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-lg">
                <EmptyContainer
                    title="Nenhuma movimentação encontrada"
                    description='Clique em "Adicionar Movimentação" para começar'
                    icon={<BanknoteArrowUp size={52} />}
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
                                Descrição
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                Categoria
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Tipo
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Valor
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Data
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--gray)">
                        {finances.map((finance) => (
                            <tr
                                key={finance.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-(--black)">
                                    {finance.description}
                                </td>
                                <td className="px-6 py-4 text-sm text-(--black)">
                                    {finance.category || "-"}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${finance.isIncome
                                                ? "bg-(--green-50) text-(--green-500)"
                                                : "bg-red-100 text-(--danger)"
                                            }`}
                                    >
                                        {finance.isIncome ? (
                                            <>
                                                <BanknoteArrowUp
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Receita
                                            </>
                                        ) : (
                                            <>
                                                <BanknoteArrowDown
                                                    size={14}
                                                    className="mr-1"
                                                />
                                                Despesa
                                            </>
                                        )}
                                    </span>
                                </td>
                                <td
                                    className={`px-6 py-4 text-center text-sm font-semibold ${finance.isIncome
                                            ? "text-(--green-500)"
                                            : "text-(--danger)"
                                        }`}
                                >
                                    {formatCurrency(finance.amount)}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-(--black)">
                                    {formatDate(finance.transactionDate)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(finance)}
                                            className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                            title="Editar movimentação"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(finance.id)}
                                            className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                            title="Excluir movimentação"
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