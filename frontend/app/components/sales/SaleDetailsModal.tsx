"use client";

import { X } from "lucide-react";
import { Sale } from "@/app/services/sale.service";
import { formatDate } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/currency";

interface SaleDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sale: Sale;
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

const PAYMENT_METHOD_LABELS: Record<string, string> = {
    DINHEIRO: "Dinheiro",
    CARTAO_CREDITO: "Cartão de Crédito",
    CARTAO_DEBITO: "Cartão de Débito",
    PIX: "PIX",
    BOLETO: "Boleto",
    TRANSFERENCIA: "Transferência",
};

export default function SaleDetailsModal({
    isOpen,
    onClose,
    sale,
}: SaleDetailsModalProps) {

    if (!isOpen) return null;


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none"
                onClick={(e)=>e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="text-xl font-bold text-(--black)">
                        Detalhes da Venda
                    </h2>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <span className="text-sm text-(--black)">
                                #{sale.id}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[sale.status]}`}
                            >
                                {STATUS_LABELS[sale.status]}
                            </span>
                        </div>

                        <span className="text-sm text-(--black)">
                            {formatDate(sale.sale_date)}
                        </span>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="font-semibold text-(--black) mb-3">
                            Cliente
                        </h3>
                        <p className="text-sm font-medium">
                            {sale.client_name}
                        </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="font-semibold text-(--black) mb-3">
                            Produtos
                        </h3>
                        <div className="space-y-3">
                            {sale.items?.map((item)=>(
                                <div
                                    key={item.id}
                                    className="border-b pb-3 last:border-none"
                                >
                                    <div className="flex justify-between">
                                        <span className="text-sm text-(--black)">
                                            Produto
                                        </span>
                                        <span className="font-medium">
                                            {item.stock?.product_name || "-"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-(--black)">
                                            Quantidade
                                        </span>
                                        <span>
                                            {item.quantity} {item.unit}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-(--black)">
                                            Preço Unitário
                                        </span>
                                        <span>
                                            {formatCurrency(Number(item.unit_price))}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-sm text-(--black)">
                                            Total
                                        </span>
                                        <span className="font-semibold">
                                            {formatCurrency(Number(item.total_price))}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between">
                            <span className="font-bold">
                                Total da Venda
                            </span>
                            <span className="font-bold text-green-600">
                                {formatCurrency(Number(sale.total_price))}
                            </span>
                        </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="font-semibold text-(--black) mb-3">
                            Informações da Venda
                        </h3>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-(--black) text-sm">
                                    Pagamento
                                </span>
                                <span>
                                    {
                                    PAYMENT_METHOD_LABELS[
                                        sale.payment_method
                                    ] || sale.payment_method
                                    }
                                </span>
                            </div>

                            {sale.notes && (
                                <div className="flex justify-between">
                                    <span className="text-(--black) text-sm">
                                        Observações
                                    </span>
                                    <span>
                                        {sale.notes}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end border-t border-gray-200 pt-4">
                        <button
                            onClick={onClose}
                            className="rounded-lg bg-(--gray) px-6 py-2.5 text-sm font-medium text-(--black) transition-all hover:bg-gray-300 cursor-pointer"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}