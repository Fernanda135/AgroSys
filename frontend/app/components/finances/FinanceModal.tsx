"use client";

import { useEffect, useState } from "react";
import { Wallet, X } from "lucide-react";
import { toast } from "react-toastify";

import {
    CreateFinanceData,
    Finance,
} from "@/app/services/finance.service";
import { getToday, formatDateInput } from "@/app/utils/date";

interface FinanceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateFinanceData) => Promise<void>;
    initialData?: Finance;
    mode: "add" | "edit";
}

const INCOME_CATEGORIES = [
    "Venda",
    "Prestação de Serviço",
    "Subsídio",
    "Financiamento",
    "Investimento",
    "Reembolso",
    "Outras Receitas",
];

const EXPENSE_CATEGORIES = [
    "Insumos",
    "Combustível",
    "Manutenção",
    "Mão de Obra",
    "Energia",
    "Irrigação",
    "Transporte",
    "Equipamentos",
    "Impostos",
    "Taxas",
    "Alimentação",
    "Outras Despesas",
];

export default function FinanceModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    mode,
}: FinanceModalProps) {

    const today = getToday();

    const [formData, setFormData] = useState<CreateFinanceData>({
        isIncome: true,
        description: "",
        amount: 0,
        category: "",
        transaction_date: today,
    });

    const [errors, setErrors] = useState<{
        description?: string;
        amount?: string;
        category?: string;
        transaction_date?: string;
    }>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                isIncome: initialData.isIncome,
                description: initialData.description,
                amount: initialData.amount,
                category: initialData.category ?? "",
                transaction_date: formatDateInput(initialData.transaction_date),
            });
        } else {
            setFormData({
                isIncome: true,
                description: "",
                amount: 0,
                category: "",
                transaction_date: today,
            });
        }

        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: {
            description?: string;
            amount?: string;
            category?: string;
            transaction_date?: string;
        } = {};

        if (!formData.description.trim()) newErrors.description = "Informe a descrição";
        if (formData.amount <= 0) newErrors.amount = "Informe um valor maior que zero";
        if (!formData.transaction_date) newErrors.transaction_date = "Informe a data";
        if (!formData.category) newErrors.category = "Selecione uma categoria";
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            toast.warning("Preencha os campos obrigatórios.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error(error);
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
                            <Wallet
                                className="text-(--green-500)"
                                size={24}
                            />
                        </div>

                        <h2 className="text-xl font-bold text-(--black)">
                            {mode === "add"
                                ? "Nova Movimentação"
                                : "Editar Movimentação"}
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-lg p-1.5 text-(--gray-2) transition-all hover:bg-(--gray) hover:text-(--black)"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Tipo *
                            </label>

                            <select
                                value={formData.isIncome ? "income" : "expense"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isIncome:
                                            e.target.value === "income",
                                        category: "",
                                    })
                                }
                                className="mt-1 w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
                            >
                                <option value="income">Receita</option>
                                <option value="expense">Despesa</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Descrição *
                            </label>

                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Ex: Venda de soja"
                                className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${errors.description
                                    ? "border-(--danger)"
                                    : "border-gray-300"
                                    } focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />

                            {errors.description && (
                                <p className="mt-1 text-sm text-(--danger)">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Valor *
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.amount}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        amount: Number(e.target.value),
                                    })
                                }
                                className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${errors.amount
                                    ? "border-(--danger)"
                                    : "border-gray-300"
                                    } focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />

                            {errors.amount && (
                                <p className="mt-1 text-sm text-(--danger)">
                                    {errors.amount}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Categoria
                            </label>

                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${errors.category
                                    ? "border-(--danger)"
                                    : "border-gray-300"
                                    } focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            >
                                <option value="">Selecione uma categoria</option>

                                {(formData.isIncome
                                    ? INCOME_CATEGORIES
                                    : EXPENSE_CATEGORIES
                                ).map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-(--danger)">
                                    {errors.category}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-(--black)">
                                Data *
                            </label>

                            <input
                                type="date"
                                value={formData.transaction_date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        transaction_date: e.target.value,
                                    })
                                }
                                className={`mt-1 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors ${errors.transaction_date
                                    ? "border-(--danger)"
                                    : "border-gray-300"
                                    } focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />

                            {errors.transaction_date && (
                                <p className="mt-1 text-sm text-(--danger)">
                                    {errors.transaction_date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 cursor-pointer rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 sm:flex-none sm:px-6"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="flex-1 cursor-pointer rounded-lg bg-(--green-500) px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 sm:flex-none sm:px-6"
                        >
                            {mode === "add"
                                ? "Adicionar Movimentação"
                                : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}