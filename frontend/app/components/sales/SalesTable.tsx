"use client";

import { useState } from "react";
import { DollarSign, SquarePen, Trash2, EyeIcon, CheckCircle, XCircle, Clock } from "lucide-react";

import { Sale, CreateSaleData, UpdateSaleData } from "@/app/services/sale.service";
import { formatDate } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/currency";
import EmptyContainer from "../EmptyContainer";
import SaleModal from "./SaleModal";
import SaleDetailsModal from "./SaleDetailsModal";

interface SaleTableProps {
    sales: Sale[];
    onAdd: (data: CreateSaleData) => Promise<any>;
    onEdit: (id: number, data: UpdateSaleData) => Promise<any>;
    onDelete: (id: number) => Promise<any>;
    onStatusChange?: (id: number, status: "PENDENTE" | "PAGO" | "CANCELADO") => Promise<any>;
}

const STATUS_LABELS = {
    PENDENTE: "Pendente",
    PAGO: "Pago",
    CANCELADO: "Cancelado",
};

const STATUS_COLORS = {
    PENDENTE: "bg-yellow-100 text-yellow-800",
    PAGO: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
};

const STATUS_ICONS = {
    PENDENTE: <Clock size={14} />,
    PAGO: <CheckCircle size={14} />,
    CANCELADO: <XCircle size={14} />,
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
    DINHEIRO: "Dinheiro",
    CARTAO_CREDITO: "Cartão de Crédito",
    CARTAO_DEBITO: "Cartão de Débito",
    PIX: "PIX",
    TRANSFERENCIA: "Transferência",
};

export default function SaleTable({
    sales,
    onAdd,
    onEdit,
    onDelete,
    onStatusChange,
}: SaleTableProps) {
    const [saleModalOpen, setSaleModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit">("add");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
    const [search, setSearch] = useState("");

    const salesDisplay = sales.filter((sale) => {
        if (selectedStatus !== "all" && sale.status !== selectedStatus) {
            return false;
        }

        if (selectedPaymentMethod !== "all" && sale.payment_method !== selectedPaymentMethod) {
            return false;
        }

        if (search.trim() !== "") {
            const searchLower = search.toLowerCase().trim();
            const clientMatch = sale.client_name.toLowerCase().includes(searchLower);
            const productMatch = sale.items?.some(item =>
                item.stock?.product_name
                    ?.toLowerCase()
                    .includes(searchLower)
            ) || false;
            return clientMatch || productMatch;
        }

        return true;
    });


    const handleEditClick = (sale: Sale) => {
        setSelectedSale(sale);
        setModalMode("edit");
        setSaleModalOpen(true);
    };

    const handleViewClick = (sale: Sale) => {
        setSelectedSale(sale);
        setDetailsModalOpen(true);
    };

    const handleCloseModals = () => {
        setSaleModalOpen(false);
        setDetailsModalOpen(false);
        setSelectedSale(null);
    };

    const handleSaveSale = async (data: CreateSaleData) => {
        if (modalMode === "add") {
            await onAdd(data);
        } else if (selectedSale) {
            await onEdit(selectedSale.id, {
                client_name: data.client_name,
                sale_date: data.sale_date,
                payment_method: data.payment_method,
                status: data.status,
                notes: data.notes,
            });
        }
    };

    const handleStatusToggle = async (sale: Sale) => {
        const newStatus = sale.status === "PENDENTE" ? "PAGO" : "PENDENTE";
        if (onStatusChange) {
            await onStatusChange(sale.id, newStatus);
        }
    };

    const handleDeleteClick = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir esta venda?")) {
            await onDelete(id);
        }
    };

    if (sales.length === 0) {
        return (
            <div className="mt-8">
                <EmptyContainer
                    title="Nenhuma venda encontrada"
                    description='Clique em "Nova Venda" para começar'
                    icon={<DollarSign />}
                />
            </div>
        );
    }

    return (
        <>
            <div className="mt-10">
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Pesquisar cliente ou produto"
                        className="flex-1 min-w-50 px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        className="px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none cursor-pointer"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        <option value="all">Todos os status</option>
                        <option value="PENDENTE">Pendente</option>
                        <option value="PAGO">Pago</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>

                    <select
                        className="px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none cursor-pointer"
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    >
                        <option value="all">Todos os métodos</option>
                        <option value="DINHEIRO">Dinheiro</option>
                        <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                        <option value="CARTAO_DEBITO">Cartão de Débito</option>
                        <option value="PIX">PIX</option>
                        <option value="TRANSFERENCIA">Transferência</option>
                    </select>
                </div>
            </div>

            <div className="mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-(--gray-2) bg-(--gray)">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Cliente
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Produtos
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Itens
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Data
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                    Pagamento
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
                            {salesDisplay.map((sale) => {
                                const isCancelled = sale.status === "CANCELADO";

                                return (
                                    <tr
                                        key={sale.id}
                                        className={`transition-colors hover:bg-gray-50 ${isCancelled ? "bg-gray-50/50" : ""
                                            }`}
                                    >
                                        <td
                                            className={`px-6 py-4 text-sm ${isCancelled
                                                ? "text-gray-400 line-through"
                                                : "font-medium text-gray-900"
                                                }`}
                                        >
                                            {sale.client_name}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${isCancelled
                                                    ? "text-gray-400 line-through"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {sale.items?.map(item => item.stock?.product_name)
                                                .filter(Boolean)
                                                .join(", ")
                                            }
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${isCancelled ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            {sale.items?.reduce(
                                                (sum, item) => sum + Number(item.quantity),
                                                0
                                            )} itens
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm font-semibold ${isCancelled ? "text-gray-400" : "text-gray-900"
                                                }`}
                                        >
                                            {formatCurrency(sale.total_price)}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${isCancelled ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            {formatDate(sale.sale_date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800">
                                                {PAYMENT_METHOD_LABELS[sale.payment_method] || sale.payment_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[sale.status]
                                                    }`}
                                            >
                                                {STATUS_ICONS[sale.status]}
                                                {STATUS_LABELS[sale.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {onStatusChange && sale.status !== "CANCELADO" && (
                                                    <button
                                                        onClick={() => handleStatusToggle(sale)}
                                                        className={`rounded-lg p-2 transition-all cursor-pointer ${sale.status === "PAGO"
                                                            ? "text-yellow-600 hover:bg-yellow-50 hover:text-yellow-900"
                                                            : "text-green-600 hover:bg-green-50 hover:text-green-900"
                                                            }`}
                                                        title={sale.status === "PENDENTE" ? "Marcar como pago" : "Marcar como pendente"}
                                                    >
                                                        {sale.status === "PENDENTE" ? (
                                                            <CheckCircle size={20} />
                                                        ) : (
                                                            <Clock size={20} />
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleEditClick(sale)}
                                                    className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                                    title="Editar venda"
                                                >
                                                    <SquarePen size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleViewClick(sale)}
                                                    className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                                    title="Visualizar detalhes"
                                                >
                                                    <EyeIcon size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(sale.id)}
                                                    className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                                    title="Excluir venda"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <SaleModal
                isOpen={saleModalOpen}
                onClose={handleCloseModals}
                onSave={handleSaveSale}
                initialData={selectedSale || undefined}
                mode={modalMode}
            />

            {selectedSale && (
                <SaleDetailsModal
                    isOpen={detailsModalOpen}
                    onClose={handleCloseModals}
                    sale={selectedSale}
                />
            )}
        </>
    );
}