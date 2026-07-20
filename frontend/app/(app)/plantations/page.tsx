"use client";

import { useState } from "react";
import { Sprout, TriangleAlert, Shapes } from "lucide-react";
import { toast } from "react-toastify";

import ProtectedRoute from '@/app/components/ProtectedRoute';
import SummaryCard from '@/app/components/SummaryCard';
import { usePlantations } from '@/app/hooks/usePlantation';
import { Plantation, CreatePlantationData } from "@/app/services/plantation.service";
import PlantationModal from "@/app/components/plantations/PlantationModal";
import PlantationTable from "@/app/components/plantations/PlantationTable";

export default function PlantationsPage() {
  const {
    plantations,
    totalCount,
    delayedCount,
    cultureCount,
    addPlantation,
    updatePlantation,
    deletePlantation,
    harvestPlantation,
  } = usePlantations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingPlantation, setEditingPlantation] = useState<Plantation | null>(null);

  const handleAddPlantation = () => {
    setModalMode("add");
    setEditingPlantation(null);
    setIsModalOpen(true);
  };

  const handleEditPlantation = (plantation: Plantation) => {
    setModalMode("edit");
    setEditingPlantation(plantation);
    setIsModalOpen(true);
  };

  const handleSavePlantation = async (data: CreatePlantationData) => {
    try {
      const response =
        modalMode === "add"
          ? await addPlantation(data)
          : editingPlantation
            ? await updatePlantation(editingPlantation.id, data)
            : null;

      if (response) {
        toast.success(response.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : `Erro ao ${modalMode === "add" ? "criar" : "atualizar"} plantação`
      );
    }
  };

  const handleHarvestClick = async (id: number) => {
    const plantation = plantations.find((p) => p.id === id);

    if (plantation && !plantation.isHarvested) {
      const confirmMessage = `Tem certeza que deseja marcar "${plantation.culture}" como colhida?`;

      if (confirm(confirmMessage)) {
        try {
          const response = await harvestPlantation(id);
          toast.success(response.message);
        } catch (error) {
          console.error(error);

          toast.error(
            error instanceof Error
              ? error.message
              : "Erro ao colher plantação"
          );
        }
      }
    }
  };

  const handleDeleteClick = async (id: number) => {
    const plantation = plantations.find((p) => p.id === id);

    if (plantation) {
      const confirmMessage = `Tem certeza que deseja excluir "${plantation.culture}"? Esta ação não pode ser desfeita.`;

      if (confirm(confirmMessage)) {
        try {
          const response = await deletePlantation(id);
          toast.success(response.message);
        } catch (error) {
          console.error(error);

          toast.error(
            error instanceof Error
              ? error.message
              : "Erro ao excluir plantação"
          );
        }
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white p-6 md:p-10 rounded-xl">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-(--black)">Plantações</h1>
              <p className="mt-1 text-sm text-(--gray-2)">
                Gerencie suas plantações e colheitas
              </p>
            </div>
            <button
              onClick={handleAddPlantation}
              className="flex items-center gap-2 rounded-lg bg-(--green-500) px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 cursor-pointer"
            >
              <Sprout size={18} />
              Adicionar Plantação
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              value={totalCount}
              title="Total de plantações"
              icon={<Sprout size={52} />}
            />
            <SummaryCard
              value={delayedCount}
              title="Colheitas atrasadas"
              icon={<TriangleAlert className="text-(--warning)" size={52} />}
            />
            <SummaryCard
              value={cultureCount}
              title="Tipos de culturas"
              icon={<Shapes size={52} />}
            />
          </div>

          <PlantationTable
            plantations={plantations}
            onHarvest={handleHarvestClick}
            onEdit={handleEditPlantation}
            onDelete={handleDeleteClick}
          />

          <PlantationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSavePlantation}
            initialData={
              editingPlantation
                ? {
                  ...editingPlantation,
                  harvestDate: editingPlantation.harvestDate ?? "",
                }
                : undefined
            }
            mode={modalMode}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}