"use client";

import { useState } from "react";
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
    showActions?: boolean;
}

export default function StockTable({
    stocks,
    onEdit,
    onDelete,
    onAddQuantity,
    showActions = true
}: StockTableProps) {

    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedUnit, setSelectedUnit] = useState("all");

    const uniqueCategories = Array.from(
        new Set(
            stocks
                .map((stock) => stock.category)
                .filter((category): category is string => typeof category === "string")
        )
    );
    const uniqueUnits = Array.from(
        new Set(
            stocks
                .map((stock) => stock.unit)
                .filter((unit): unit is string => typeof unit === "string")
        )
    );

    const filteredStocks = stocks.filter((stock) => {
        if (selectedStatus === "available" && stock.quantity <= 5) return false;
        if (selectedStatus === "low" && (stock.quantity === 0 || stock.quantity > 5)) return false;
        if (selectedStatus === "empty" && stock.quantity > 0) return false;
        if (selectedCategory !== "all" && stock.category !== selectedCategory) return false;
        if (selectedUnit !== "all" && stock.unit !== selectedUnit) return false;

        if (search.trim() !== "") {
            const value = search.toLowerCase().trim();
            return (
                stock.product_name.toLowerCase().includes(value) ||
                stock.category?.toLowerCase().includes(value)
            );
        }

        return true;
    });

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
        <>
            {showActions && (<div className="mt-8">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Pesquisar produto"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 min-w-50 px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none"
                    />

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 text-sm outline-none focus:border-(--green-500) focus:ring-2 focus:ring-(--green-50)"
                    >
                        <option value="all">Todos os status</option>
                        <option value="available">Disponível</option>
                        <option value="low">Estoque baixo</option>
                        <option value="empty">Sem estoque</option>
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 text-sm outline-none focus:border-(--green-500) focus:ring-2 focus:ring-(--green-50)"
                    >
                        <option value="all">Todas categorias</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                        className="cursor-pointer rounded-lg border border-gray-300 px-5 py-2 text-sm outline-none focus:border-(--green-500) focus:ring-2 focus:ring-(--green-50)"
                    >
                        <option value="all">Todas unidades</option>
                        {uniqueUnits.map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </div>
            </div>)}

            <div className="mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-(--gray-2) bg-(--gray)">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Produto
                                </th>
                                {showActions && (<th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Categoria
                                </th>)}
                                <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                    Quantidade
                                </th>
                                {showActions && (<>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                        Preço Unitário
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-(--black)">
                                        Ações
                                    </th>
                                </>)}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-(--gray)">
                            {filteredStocks.map((stock) => (
                                <tr
                                    key={stock.id}
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-(--black)">
                                        {stock.product_name}
                                    </td>
                                    {showActions && (<td className="px-6 py-4 text-sm text-(--black)">
                                        {stock.category || "-"}
                                    </td>)}
                                    <td className="px-6 py-4 text-center text-sm font-medium text-(--black)">
                                        {stock.quantity} {stock.unit || "un"}
                                    </td>
                                    {showActions && (
                                        <>
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
                                        </>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}