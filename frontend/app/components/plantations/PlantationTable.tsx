"use client";

import { Sprout, CircleCheckBig, SquarePen, Trash2 } from "lucide-react";
import { Plantation } from "@/app/services/plantation.service";
import { formatDate } from "@/app/utils/date";

interface PlantationTableProps {
    plantations: Plantation[];
    onHarvest: (id: number) => void;
    onEdit: (plantation: Plantation) => void;
    onDelete: (id: number) => void;
}

export default function PlantationTable({
    plantations,
    onHarvest,
    onEdit,
    onDelete,
}: PlantationTableProps) {
    if (plantations.length === 0) {
        return (
            <div className="mt-8 rounded-xl bg-white p-12 text-center shadow-lg">
                <div className="flex flex-col items-center gap-3">
                    <Sprout className="text-gray-300" size={52} />
                    <h3 className="text-lg font-semibold text-gray-600">
                        Nenhuma plantação encontrada
                    </h3>
                    <p className="text-sm text-gray-500">
                        Clique em "Adicionar Plantação" para começar
                    </p>
                </div>
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
                                Cultura
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Plantio
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Colheita
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
                        {plantations.map((plantation) => {
                            const delayed =
                                !plantation.isHarvested &&
                                plantation.harvestDate &&
                                new Date(plantation.harvestDate) < new Date();

                            return (
                                <tr
                                    key={plantation.id}
                                    className={`transition-colors hover:bg-gray-50 ${plantation.isHarvested ? "bg-gray-50/50" : ""
                                        }`}
                                >
                                    <td
                                        className={`px-6 py-4 text-sm ${plantation.isHarvested
                                                ? "text-gray-400 line-through"
                                                : "font-medium text-gray-900"
                                            }`}
                                    >
                                        {plantation.culture}
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-sm ${plantation.isHarvested ? "text-gray-400" : "text-gray-600"
                                            }`}
                                    >
                                        {formatDate(plantation.plantingDate)}
                                    </td>
                                    <td
                                        className={`px-6 py-4 text-sm ${plantation.isHarvested ? "text-gray-400" : "text-gray-600"
                                            }`}
                                    >
                                        {formatDate(plantation.harvestDate)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${plantation.isHarvested
                                                    ? "bg-(--green-50) text-(--green-500)"
                                                    : delayed
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {plantation.isHarvested
                                                ? "Colhida"
                                                : delayed
                                                    ? "Atrasada"
                                                    : "Em cultivo"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => onHarvest(plantation.id)}
                                                disabled={plantation.isHarvested}
                                                className={`rounded-lg p-2 transition-all cursor-pointer ${plantation.isHarvested
                                                        ? "cursor-not-allowed text-gray-300"
                                                        : "text-(--green-500) hover:bg-green-50 hover:text-green-900"
                                                    }`}
                                                title="Marcar como colhida"
                                            >
                                                <CircleCheckBig size={20} />
                                            </button>
                                            <button
                                                onClick={() => onEdit(plantation)}
                                                className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                                title="Editar plantação"
                                            >
                                                <SquarePen size={20} />
                                            </button>
                                            <button
                                                onClick={() => onDelete(plantation.id)}
                                                className="rounded-lg p-2 text-(--danger) transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                                                title="Excluir plantação"
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
    );
}