"use client";

import { useState } from "react";
import { Sprout, CircleCheckBig, SquarePen, Trash2, EyeIcon } from "lucide-react";

import { Plantation } from "@/app/services/plantation.service";
import { formatDate } from "@/app/utils/date";
import EmptyContainer from "../EmptyContainer";
import HarvestStockModal from "../stock/HarvestStockModal";
import PlantationDetailsModal from "./PlantationDetailsModal";
import { PLANTATION_STATUS, PLANTATION_STATUS_LABELS, PLANTATION_STATUS_COLORS } from "@/app/constants/plantation-status";

interface PlantationTableProps {
    plantations: Plantation[];
    onHarvest: (id: number, stockData?: any) => void;
    onEdit: (plantation: Plantation) => void;
    onDelete: (id: number) => void;
}

export default function PlantationTable({
    plantations,
    onHarvest,
    onEdit,
    onDelete,
}: PlantationTableProps) {
    const [harvestModalOpen, setHarvestModalOpen] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedPlantation, setSelectedPlantation] = useState<Plantation | null>(null);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [search, setSearch] = useState("");

    const plantationsDisplay = plantations.filter((plantation) => {
        if (
            selectedStatus !== "all" &&
            plantation.status !== selectedStatus
        ) {
            return false;
        }

        if (search.trim() !== "") {
            const searchLower = search.toLowerCase().trim();

            const cultureMatch = plantation.culture
                .toLowerCase()
                .includes(searchLower);

            const varietyMatch =
                plantation.variety
                    ?.toLowerCase()
                    .includes(searchLower) || false;

            return cultureMatch || varietyMatch;
        }

        return true;
    });

    function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedStatus(e.target.value);
    }

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
    }

    const handleHarvestClick = (plantation: Plantation) => {
        setSelectedPlantation(plantation);
        setHarvestModalOpen(true);
    };

    const handleDetailsClick = (plantation: Plantation) => {
        setSelectedPlantation(plantation);
        setDetailsModalOpen(true);
    };

    const handleHarvestSave = (stockData: any) => {
        if (selectedPlantation) {
            onHarvest(selectedPlantation.id, stockData);
        }
        setHarvestModalOpen(false);
        setSelectedPlantation(null);
    };

    const handleCloseModals = () => {
        setHarvestModalOpen(false);
        setDetailsModalOpen(false);
        setSelectedPlantation(null);
    };

    if (plantations.length === 0) {
        return (
            <div className="mt-8">
                <EmptyContainer
                    title="Nenhuma plantação encontrada"
                    description='Clique em "Adicionar Plantação" para começar'
                    icon={<Sprout />}
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
                        placeholder="Pesquisar cultura ou variedade"
                        className="flex-1 min-w-50 px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none"
                        value={search}
                        onChange={handleSearch}
                    />

                    <select
                        className="px-5 py-2 rounded-lg border border-gray-300 text-sm outline-none cursor-pointer"
                        value={selectedStatus}
                        onChange={handleFilter}
                    >
                        <option value="all">Todos os status</option>
                        <option value="PLANTED">Plantada</option>
                        <option value="GROWING">Em crescimento</option>
                        <option value="READY">Pronta</option>
                        <option value="DELAYED">Atrasada</option>
                        <option value="HARVESTED">Colhida</option>
                    </select>
                </div>
            </div>
            <div className="mt-2 overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-(--gray-2) bg-(--gray)">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Cultura
                                </th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-(--black)">
                                    Variedade
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
                            {plantationsDisplay.map((plantation) => {
                                

                                return (
                                    <tr
                                        key={plantation.id}
                                        className={`transition-colors hover:bg-gray-50 ${plantation.status === PLANTATION_STATUS.HARVESTED ? "bg-gray-50/50" : ""
                                            }`}
                                    >
                                        <td
                                            className={`px-6 py-4 text-sm ${plantation.status === PLANTATION_STATUS.HARVESTED
                                                ? "text-gray-400 line-through"
                                                : "font-medium text-gray-900"
                                                }`}
                                        >
                                            {plantation.culture}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${plantation.status === PLANTATION_STATUS.HARVESTED
                                                ? "text-gray-400 line-through"
                                                : "font-medium text-gray-900"
                                                }`}
                                        >
                                            {plantation.variety || "-"}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${plantation.status === PLANTATION_STATUS.HARVESTED ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            {formatDate(plantation.planting_date)}
                                        </td>
                                        <td
                                            className={`px-6 py-4 text-sm ${plantation.status === PLANTATION_STATUS.HARVESTED ? "text-gray-400" : "text-gray-600"
                                                }`}
                                        >
                                            {plantation.harvest_date ? formatDate(plantation.harvest_date) : "-"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${PLANTATION_STATUS_COLORS[plantation.status]}`}
                                            >
                                                {PLANTATION_STATUS_LABELS[plantation.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleHarvestClick(plantation)}
                                                    disabled={plantation.status === PLANTATION_STATUS.HARVESTED}
                                                    className={`rounded-lg p-2 transition-all cursor-pointer ${plantation.status === PLANTATION_STATUS.HARVESTED
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
                                                    onClick={() => handleDetailsClick(plantation)}
                                                    className="rounded-lg p-2 text-(--info) transition-all hover:bg-blue-50 hover:text-blue-900 cursor-pointer"
                                                    title="Visualizar detalhes"
                                                >
                                                    <EyeIcon size={20} />
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

            {selectedPlantation && (
                <HarvestStockModal
                    isOpen={harvestModalOpen}
                    onClose={handleCloseModals}
                    onSave={handleHarvestSave}
                    plantationData={{
                        id: selectedPlantation.id,
                        culture: selectedPlantation.culture,
                        variety: selectedPlantation.variety || "",
                        expected_production: selectedPlantation.expected_production || 0,
                        quantity_planted: selectedPlantation.quantity_planted || 0,
                        unit: selectedPlantation.unit || "kg",
                    }}
                />
            )}

            {selectedPlantation && (
                <PlantationDetailsModal
                    isOpen={detailsModalOpen}
                    onClose={handleCloseModals}
                    plantation={selectedPlantation}
                />
            )}
        </>
    );
}