"use client";

import { Sprout, Calendar, Package, FileText, Tag, Ruler } from "lucide-react";

import { Plantation } from "@/app/services/plantation.service";
import { formatDate } from "@/app/utils/date";
import { PLANTATION_STATUS, PLANTATION_STATUS_LABELS, PLANTATION_STATUS_COLORS } from "@/app/constants/plantation-status";


interface PlantationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    plantation: Plantation | null;
}

export default function PlantationDetailsModal({
    isOpen,
    onClose,
    plantation,
}: PlantationDetailsModalProps) {
    if (!isOpen || !plantation) return null;


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-(--green-50) p-2">
                            <Sprout className="text-(--green-500)" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-(--black)">
                                Detalhes da Plantação
                            </h2>
                            <p className="text-sm text-gray-500">
                                #{plantation.id} • {plantation.culture}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Tag className="mt-0.5 text-gray-400" size={18} />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Cultura</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {plantation.culture}
                                    </p>
                                </div>
                            </div>

                            {plantation.variety && (
                                <div className="flex items-start gap-3">
                                    <FileText className="mt-0.5 text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Variedade</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {plantation.variety}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 text-gray-400" size={18} />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Data de Plantio</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {formatDate(plantation.planting_date)}
                                    </p>
                                </div>
                            </div>

                            {plantation.harvest_date && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="mt-0.5 text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Data de Colheita</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {formatDate(plantation.harvest_date)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Package className="mt-0.5 text-gray-400" size={18} />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Quantidade Plantada</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        {plantation.quantity_planted} {plantation.unit || "un"}
                                    </p>
                                </div>
                            </div>

                            {plantation.expected_production != null && (
                                <div className="flex items-start gap-3">
                                    <Ruler className="mt-0.5 text-gray-400" size={18} />
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">Produção Esperada</p>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {`${plantation.expected_production} kg`}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Status</p>
                                    <p className={`rounded-full px-3 py-1 text-xs font-medium ${PLANTATION_STATUS_COLORS[plantation.status]}`}>
                                        {PLANTATION_STATUS_LABELS[plantation.status]}
                                    </p>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        {plantation.notes && (
                            <div className="flex items-start gap-3">
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Observações</p>
                                    <p className="text-sm text-gray-700">
                                        {plantation.notes}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-xs font-medium text-gray-500">ID da Plantação</p>
                                <p className="font-mono text-sm text-gray-900">#{plantation.id}</p>
                            </div>
                            {plantation.createdAt && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Criado em</p>
                                    <p className="text-sm text-gray-900">
                                        {formatDate(plantation.createdAt)}
                                    </p>
                                </div>
                            )}
                            {plantation.updatedAt && (
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Atualizado em</p>
                                    <p className="text-sm text-gray-900">
                                        {formatDate(plantation.updatedAt)}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
                        <button
                            type="button"
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