"use client";

import { useState, useEffect } from "react";
import { X, Sprout } from "lucide-react";
import { toast } from "react-toastify";

interface PlantationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        culture: string;
        plantingDate: string;
        harvestDate: string;
    }) => void;
    initialData?: {
        id: number;
        culture: string;
        plantingDate: string;
        harvestDate: string;
    } | null;
    mode: "add" | "edit";
}

export default function PlantationModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    mode,
}: PlantationModalProps) {
    const [culture, setCulture] = useState("");
    const [plantingDate, setPlantingDate] = useState("");
    const [harvestDate, setHarvestDate] = useState("");
    const [errors, setErrors] = useState<{
        culture?: string;
        plantingDate?: string;
        harvestDate?: string;
    }>({});

    useEffect(() => {
        if (initialData && mode === "edit") {
            setCulture(initialData.culture);
            setPlantingDate(initialData.plantingDate);
            setHarvestDate(initialData.harvestDate);
        } else {
            setCulture("");
            setPlantingDate("");
            setHarvestDate("");
        }
        setErrors({});
    }, [initialData, mode, isOpen]);

    const validate = () => {
        const newErrors: {
            culture?: string;
            plantingDate?: string;
            harvestDate?: string;
        } = {};

        if (!culture.trim()) {
            newErrors.culture = "Informe o nome da cultura";
        }
        if (!plantingDate) {
            newErrors.plantingDate = "Informe a data de plantio";
        }
        if (!harvestDate) {
            newErrors.harvestDate = "Informe a data de colheita";
        }
        if (plantingDate && harvestDate && new Date(plantingDate) > new Date(harvestDate)) {
            newErrors.harvestDate = "A data de colheita deve ser após a data de plantio";
        }

        setErrors(newErrors);
        toast.warning("Preencha os campos obrigatórios!");
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({
            culture: culture.trim(),
            plantingDate,
            harvestDate,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-(--green-50) p-2">
                            <Sprout className="text-(--green-500)" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-(--black)">
                            {mode === "add" ? "Nova Plantação" : "Editar Plantação"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-(--gray-2) transition-all hover:bg-(--gray) hover:text-(--black) cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* Cultura */}
                        <div>
                            <label htmlFor="culture" className="block text-sm font-medium text-(--black)">
                                Cultura *
                            </label>
                            <input
                                id="culture"
                                type="text"
                                value={culture}
                                onChange={(e) => setCulture(e.target.value)}
                                placeholder="Ex: Soja, Milho, Café..."
                                className={`mt-1 w-full rounded-lg border ${errors.culture ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.culture && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.culture}</p>
                            )}
                        </div>

                        {/* Data de Plantio */}
                        <div>
                            <label htmlFor="plantingDate" className="block text-sm font-medium text-(--black)">
                                Data de Plantio *
                            </label>
                            <input
                                id="plantingDate"
                                type="date"
                                value={plantingDate}
                                onChange={(e) => setPlantingDate(e.target.value)}
                                className={`mt-1 w-full rounded-lg border ${errors.plantingDate ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.plantingDate && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.plantingDate}</p>
                            )}
                        </div>

                        {/* Data de Colheita */}
                        <div>
                            <label htmlFor="harvestDate" className="block text-sm font-medium text-(--black)">
                                Data de Colheita *
                            </label>
                            <input
                                id="harvestDate"
                                type="date"
                                value={harvestDate}
                                onChange={(e) => setHarvestDate(e.target.value)}
                                className={`mt-1 w-full rounded-lg border ${errors.harvestDate ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.harvestDate && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.harvestDate}</p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 sm:flex-none sm:px-6 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-(--green-500) px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 sm:flex-none sm:px-6 cursor-pointer"
                        >
                            {mode === "add" ? "Adicionar Plantação" : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}