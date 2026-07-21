"use client";

import { useState, useEffect } from "react";
import { X, Sprout } from "lucide-react";
import { toast } from "react-toastify";

import { getToday, formatDateInput } from "@/app/utils/date";

interface PlantationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: {
        culture: string;
        planting_date: string;
        harvest_date?: string;
        variety?: string;
        quantity_planted?: number;
        unit?: string;
        expected_production?: number;
        notes?: string;
    }) => void;
    initialData?: {
        id: number;
        culture: string;
        planting_date: string;
        harvest_date?: string | null;
        variety?: string | null;
        quantity_planted?: number;
        unit?: string | null;
        expected_production?: number | null;
        notes?: string | null;
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
    const [planting_date, setPlantingDate] = useState("");
    const [harvest_date, setHarvestDate] = useState("");
    const [variety, setVariety] = useState("");
    const [quantity_planted, setQuantityPlanted] = useState(1);
    const [unit, setUnit] = useState("");
    const [expected_production, setExpectedProduction] = useState<number | "">(
        "",
    );
    const [notes, setNotes] = useState("");

    const [errors, setErrors] = useState<{
        culture?: string;
        planting_date?: string;
        harvest_date?: string;
    }>({});

    const today = getToday();

    useEffect(() => {
        if (initialData && mode === "edit") {
            setCulture(initialData.culture);
            setPlantingDate(formatDateInput(initialData.planting_date));
            setHarvestDate(initialData.harvest_date ? formatDateInput(initialData.harvest_date) : "");
            setVariety(initialData.variety ?? "");
            setQuantityPlanted(initialData.quantity_planted ?? 1);
            setUnit(initialData.unit ?? "");
            setExpectedProduction(initialData.expected_production ?? "");
            setNotes(initialData.notes ?? "");
        } else {
            setCulture("");
            setPlantingDate(today);
            setHarvestDate("");
            setVariety("");
            setQuantityPlanted(1);
            setUnit("");
            setExpectedProduction("");
            setNotes("");
        }
        setErrors({});
    }, [initialData, mode, isOpen]);

    function validate() {
        const newErrors: {
            culture?: string;
            planting_date?: string;
            harvest_date?: string;
        } = {};

        if (!culture.trim()) {
            newErrors.culture = "Informe o nome da cultura";
        }
        if (!planting_date) {
            newErrors.planting_date = "Informe a data de plantio";
        }
        if (
            planting_date &&
            harvest_date &&
            new Date(planting_date) > new Date(harvest_date)
        ) {
            newErrors.harvest_date = "A colheita deve ser após o plantio";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.warning("Verifique os campos obrigatórios");
            return false;
        }
        return true;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validate()) return;

        onSave({
            culture: culture.trim(),
            planting_date,
            harvest_date: harvest_date || undefined,
            variety: variety.trim() || undefined,
            quantity_planted,
            unit: unit.trim() || undefined,
            expected_production:
                expected_production === "" ? undefined : Number(expected_production),
            notes: notes.trim() || undefined,
        });
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none"
                onClick={(e) => e.stopPropagation()}
            >
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

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Cultura *
                            </label>
                            <input
                                value={culture}
                                onChange={(e) => setCulture(e.target.value)}
                                placeholder="Ex: Milho, Soja, Café"
                                className={`mt-1 w-full rounded-lg border ${errors.culture ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.culture && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.culture}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Variedade
                            </label>
                            <input
                                value={variety}
                                onChange={(e) => setVariety(e.target.value)}
                                placeholder="Ex: AG 1051"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-(--black)">
                                    Data de plantio *
                                </label>
                                <input
                                    type="date"
                                    value={planting_date}
                                    onChange={(e) => setPlantingDate(e.target.value)}
                                    className={`mt-1 w-full rounded-lg border ${errors.planting_date ? "border-(--danger)" : "border-gray-300"
                                        } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                                />
                                {errors.planting_date && (
                                    <p className="mt-1 text-sm text-(--danger)">{errors.planting_date}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--black)">
                                    Previsão de colheita
                                </label>
                                <input
                                    type="date"
                                    value={harvest_date}
                                    onChange={(e) => setHarvestDate(e.target.value)}
                                    className={`mt-1 w-full rounded-lg border ${errors.harvest_date ? "border-(--danger)" : "border-gray-300"
                                        } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                                />
                                {errors.harvest_date && (
                                    <p className="mt-1 text-sm text-(--danger)">{errors.harvest_date}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-(--black)">
                                    Quantidade plantada
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity_planted}
                                    onChange={(e) => setQuantityPlanted(Number(e.target.value))}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-(--black)">
                                    Unidade
                                </label>
                                <input
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    placeholder="kg, mudas..."
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Produção esperada
                            </label>
                            <input
                                type="number"
                                value={expected_production}
                                onChange={(e) =>
                                    setExpectedProduction(
                                        e.target.value === "" ? "" : Number(e.target.value),
                                    )
                                }
                                placeholder="Ex: 500 kg"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Observações
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                                placeholder="Informações adicionais..."
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                            />
                        </div>
                    </div>

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
                            {mode === "add" ? "Adicionar" : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}