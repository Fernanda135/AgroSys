"use client";

import { useState, useEffect } from "react";
import { ClipboardList, X } from "lucide-react";
import { Todo } from "@/app/services/todo.service";
import { toast } from "react-toastify";

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { title: string; description: string }) => void;
    initialData?: Todo;
    mode: "add" | "edit";
}

export default function TodoModal({
    isOpen,
    onClose,
    onSave,
    initialData,
    mode,
}: TodoModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ title?: string; description?: string }>(
        {}
    );

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
        setErrors({});
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors: {
            title?: string;
            description?: string
        } = {};
        if (!title.trim()) newErrors.title = "Título é obrigatório";
        if (!description.trim()) newErrors.description = "Descrição é obrigatória";
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
            onSave({ title: title.trim(), description: description.trim() });
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
                            <ClipboardList className="text-(--green-500)" size={24} />
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
                            <label htmlFor="title" className="block text-sm font-medium text-(--black)">
                                Título *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Digite o título da tarefa"
                                className={`mt-1 w-full rounded-lg border ${errors.title ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-(--black)">
                                Descrição *
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Digite a descrição da tarefa"
                                rows={4}
                                className={`mt-1 w-full rounded-lg border ${errors.description ? "border-(--danger)" : "border-gray-300"
                                    } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-(--danger)">{errors.description}</p>
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
                            {mode === "add" ? "Criar Tarefa" : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}