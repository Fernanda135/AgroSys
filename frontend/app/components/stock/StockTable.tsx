"use client";

import { Package, SquarePen, Trash2 } from "lucide-react";

import { Stock } from "@/app/services/stock.service";
import EmptyContainer from "../EmptyContainer";
import { formatCurrency } from "@/app/utils/currency";

interface StockTableProps {
    stocks: Stock[];
    loading: boolean;
    onEdit: (stock: Stock) => void;
    onDelete: (id: number) => void;
    onAddQuantity?: (id: number) => void;
}

export default function StockTable({
    stocks,
    onEdit,
    onDelete,
    onAddQuantity,
}: StockTableProps) {
    if (stocks.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-lg">
                <EmptyContainer
                    title="Nenhum produto cadastrado"
                    description='Clique em "Adicionar Produto" para começar'
                    icon={<Package size={50} />}
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
                                Produto
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                Categoria
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Quantidade
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Preço Unitário
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--gray)">
                        {stocks.map((stock) => (
                            <tr
                                key={stock.id}
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-sm font-medium text-(--black)">
                                    {stock.product_name}
                                </td>
                                <td className="px-6 py-4 text-sm text-(--black)">
                                    {stock.category || "-"}
                                </td>
                                <td className="px-6 py-4 text-center text-sm font-medium text-(--black)">
                                    {stock.quantity} {stock.unit || "un"}
                                </td>
                                <td className="px-6 py-4 text-center text-sm font-medium text-(--black)">
                                    {formatCurrency(stock.unit_price)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${stock.quantity === 0
                                            ? "bg-red-100 text-(--danger)"
                                            : stock.quantity <= 5
                                                ? "bg-yellow-100 text-(--warning)"
                                                : "bg-(--green-50) text-(--green-500)"
                                            }`}
                                    >
                                        {stock.quantity === 0
                                            ? "Sem estoque"
                                            : stock.quantity <= 5
                                                ? "Estoque baixo"
                                                : "Disponível"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {onAddQuantity && (
                                            <button
                                                onClick={() => onAddQuantity(stock.id)}
                                                className="rounded-lg p-2 text-(--green-500) transition-all hover:bg-green-50 hover:text-green-900 cursor-pointer"
                                                title="Adicionar quantidade"
                                            >
                                                <Package size={20} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onEdit(stock)}
                                            className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                            title="Editar produto"
                                        >
                                            <SquarePen size={20} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(stock.id)}
                                            className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                            title="Excluir produto"
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