// app/components/stock/HarvestStockModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Package, X, Sprout } from "lucide-react";
import { toast } from "react-toastify";

interface HarvestStockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    plantationData: {
        id: number;
        culture: string;
        variety: string;
        expected_production?: number;
        quantity_planted?: number;
        unit?: string;
    };
}

export default function HarvestStockModal({
    isOpen,
    onClose,
    onSave,
    plantationData,
}: HarvestStockModalProps) {
    const [formData, setFormData] = useState({
        product_name: "",
        quantity: 0,
        unit: "kg",
        category: "colheita",
        unit_price: 0,
        plantation_id: plantationData.id,
    });
    const [errors, setErrors] = useState<{
        product_name?: string;
        quantity?: string;
        unit_price?: string;
    }>({});

    // Pré-preenche todos os dados quando o modal abre
    useEffect(() => {
        if (plantationData && isOpen) {
            // Define o nome do produto
            const productName = `${plantationData.culture} - ${plantationData.variety}`;
            
            // Define a unidade padrão baseada na unidade da plantação
            let defaultUnit = "kg";
            if (plantationData.unit) {
                const unitMap: Record<string, string> = {
                    'kg': 'kg',
                    'ton': 'ton',
                    'sc': 'sc',
                    'cx': 'cx',
                    'un': 'un',
                    'l': 'l',
                    'g': 'g',
                    'ml': 'ml',
                };
                defaultUnit = unitMap[plantationData.unit] || 'kg';
            }

            // Define a quantidade: prioriza produção esperada, depois quantidade plantada
            let defaultQuantity = 0;
            if (plantationData.expected_production && plantationData.expected_production > 0) {
                defaultQuantity = plantationData.expected_production;
            } else if (plantationData.quantity_planted && plantationData.quantity_planted > 0) {
                defaultQuantity = plantationData.quantity_planted;
            }

            setFormData({
                product_name: productName,
                quantity: defaultQuantity,
                unit: defaultUnit,
                category: "colheita",
                unit_price: 0,
                plantation_id: plantationData.id,
            });
        }
    }, [plantationData, isOpen]);

    // Reset quando o modal fecha
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                product_name: "",
                quantity: 0,
                unit: "kg",
                category: "colheita",
                unit_price: 0,
                plantation_id: plantationData.id,
            });
            setErrors({});
        }
    }, [isOpen, plantationData.id]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: {
            product_name?: string;
            quantity?: string;
            unit_price?: string;
        } = {};

        if (!formData.product_name.trim()) {
            newErrors.product_name = "Nome do produto é obrigatório";
        }
        if (formData.quantity <= 0) {
            newErrors.quantity = "Quantidade deve ser maior que zero";
        }
        if (formData.unit_price < 0) {
            newErrors.unit_price = "Preço não pode ser negativo";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.warning("Preencha todos os campos obrigatórios!");
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave({
                ...formData,
                plantation_id: plantationData.id,
            });
            onClose();
        }
    };

    const units = [
        { value: "kg", label: "Quilograma (kg)" },
        { value: "g", label: "Grama (g)" },
        { value: "ton", label: "Tonelada (ton)" },
        { value: "sc", label: "Saco (sc)" },
        { value: "cx", label: "Caixa (cx)" },
        { value: "fd", label: "Fardo (fd)" },
        { value: "un", label: "Unidade" },
        { value: "l", label: "Litro (L)" },
        { value: "ml", label: "Mililitro (mL)" },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-(--green-50) p-2">
                            <Sprout className="text-(--green-500)" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-(--black)">
                                Registrar Colheita
                            </h2>
                            <p className="text-sm text-gray-600">
                                {plantationData.culture} - {plantationData.variety}
                            </p>
                        </div>
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
                            <label htmlFor="product_name" className="block text-sm font-medium text-(--black)">
                                Nome do Produto *
                            </label>
                            <input
                                id="product_name"
                                type="text"
                                value={formData.product_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, product_name: e.target.value })
                                }
                                placeholder="Ex: Soja, Milho, Café..."
                                className={`mt-1 w-full rounded-lg border ${errors.product_name ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.product_name && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.product_name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-(--black)">
                                Quantidade Colhida *
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({ ...formData, quantity: Number(e.target.value) })
                                }
                                placeholder="0"
                                min="0.01"
                                step="0.01"
                                className={`mt-1 w-full rounded-lg border ${errors.quantity ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.quantity && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.quantity}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="unit" className="block text-sm font-medium text-(--black)">
                                Unidade
                            </label>
                            <select
                                id="unit"
                                value={formData.unit}
                                onChange={(e) =>
                                    setFormData({ ...formData, unit: e.target.value })
                                }
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50) cursor-pointer"
                            >
                                {units.map((unit) => (
                                    <option key={unit.value} value={unit.value}>
                                        {unit.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="unit_price" className="block text-sm font-medium text-(--black)">
                                Preço Unitário (R$)
                            </label>
                            <input
                                id="unit_price"
                                type="number"
                                step="0.01"
                                value={formData.unit_price}
                                onChange={(e) =>
                                    setFormData({ ...formData, unit_price: Number(e.target.value) })
                                }
                                placeholder="0,00"
                                min="0"
                                className={`mt-1 w-full rounded-lg border ${errors.unit_price ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.unit_price && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.unit_price}</p>
                            )}
                        </div>

                        <div className="rounded-lg bg-blue-50 p-3">
                            <p className="text-sm text-blue-700">
                                <span className="font-semibold">Info:</span> A plantação será adicionada ao estoque com a categoria "Produtos da Colheita".
                            </p>
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
                            Adicionar ao Estoque
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}