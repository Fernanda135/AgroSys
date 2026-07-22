// app/components/stock/StockModal.tsx
"use client";

import { useState, useEffect } from "react";
import { Package, X } from "lucide-react";
import { toast } from "react-toastify";

import { Stock } from "@/app/services/stock.service";

interface StockModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData?: Stock;
    mode: "add" | "edit";
}

export default function StockModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    mode,
}: StockModalProps) {
    const [formData, setFormData] = useState({
        product_name: "",
        quantity: 0,
        unit: "un",
        category: "outros",
        unit_price: 0,
    });
    const [errors, setErrors] = useState<{
        product_name?: string;
        quantity?: string;
        unit?: string;
        category?: string;
        unit_price?: string;
    }>({});

    const categories = [
        { value: "sementes", label: "Sementes" },
        { value: "mudas", label: "Mudas" },
        { value: "fertilizantes", label: "Fertilizantes" },
        { value: "corretivos", label: "Corretivos de Solo" },
        { value: "defensivos", label: "Defensivos Agrícolas" },
        { value: "herbicidas", label: "Herbicidas" },
        { value: "inseticidas", label: "Inseticidas" },
        { value: "fungicidas", label: "Fungicidas" },
        { value: "irrigacao", label: "Irrigação" },
        { value: "maquinas", label: "Máquinas Agrícolas" },
        { value: "implementos", label: "Implementos" },
        { value: "ferramentas", label: "Ferramentas Manuais" },
        { value: "racao", label: "Ração Animal" },
        { value: "medicamentos", label: "Medicamentos Veterinários" },
        { value: "embalagens", label: "Embalagens" },
        { value: "combustivel", label: "Combustível" },
        { value: "lubrificantes", label: "Lubrificantes" },
        { value: "pecas", label: "Peças e Acessórios" },
        { value: "colheita", label: "Produtos da Colheita" },
        { value: "graos", label: "Grãos" },
        { value: "frutas", label: "Frutas" },
        { value: "hortalicas", label: "Hortaliças" },
        { value: "organicos", label: "Produtos Orgânicos" },
        { value: "outros", label: "Outros" },
    ];

    useEffect(() => {
        if (initialData) {
            setFormData({
                product_name: initialData.product_name || "",
                quantity: initialData.quantity || 0,
                unit: initialData.unit || "un",
                category: initialData.category || "outros",
                unit_price: initialData.unit_price || 0,
            });
        } else {
            setFormData({
                product_name: "",
                quantity: 0,
                unit: "un",
                category: "outros",
                unit_price: 0,
            });
        }
        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: {
            product_name?: string;
            quantity?: string;
            unit?: string;
            category?: string;
            unit_price?: string;
        } = {};

        if (!formData.product_name.trim()) {
            newErrors.product_name = "Nome do produto é obrigatório";
        }
        if (formData.quantity < 0) {
            newErrors.quantity = "Quantidade não pode ser negativa";
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
            onSave(formData);
            onClose();
        }
    };

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
                            <Package className="text-(--green-500)" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-(--black)">
                            {mode === "add" ? "Adicionar Produto" : "Editar Produto"}
                        </h2>
                    </div>
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
                                placeholder="Ex: Soja, Adubo, Trator..."
                                className={`mt-1 w-full rounded-lg border ${errors.product_name ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.product_name && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.product_name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-(--black)">
                                Categoria
                            </label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className={`mt-1 w-full rounded-lg border cursor-pointer ${errors.category ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.category}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-(--black)">
                                Quantidade *
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({ ...formData, quantity: Number(e.target.value) })
                                }
                                placeholder="0"
                                min="0"
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
                                <option value="un">Unidade</option>
                                <option value="kg">Quilograma (kg)</option>
                                <option value="g">Grama (g)</option>
                                <option value="ton">Tonelada (ton)</option>
                                <option value="l">Litro (L)</option>
                                <option value="ml">Mililitro (mL)</option>
                                <option value="cx">Caixa (cx)</option>
                                <option value="sc">Saco (sc)</option>
                                <option value="fd">Fardo (fd)</option>
                                <option value="m">Metro (m)</option>
                                <option value="m²">Metro Quadrado (m²)</option>
                                <option value="ha">Hectare (ha)</option>
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
                            {mode === "add" ? "Adicionar Produto" : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}