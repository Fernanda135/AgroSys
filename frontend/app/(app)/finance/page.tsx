"use client";

import { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SummaryCard from "@/app/components/SummaryCard";
import FinanceTable from "@/app/components/finances/FinanceTable";
import FinanceModal from "@/app/components/finances/FinanceModal";

import { useFinances } from "@/app/hooks/useFinances";
import {
  Finance,
  CreateFinanceData,
} from "@/app/services/finance.service";

import { formatCurrency } from "@/app/utils/currency";

export default function FinancePage() {
  const {
    finances,
    totalIncome,
    totalExpense,
    balance,
    addFinance,
    updateFinance,
    deleteFinance,
  } = useFinances();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingFinance, setEditingFinance] =
    useState<Finance | null>(null);

  const handleAddFinance = () => {
    setModalMode("add");
    setEditingFinance(null);
    setIsModalOpen(true);
  };

  const handleEditFinance = (finance: Finance) => {
    setModalMode("edit");
    setEditingFinance(finance);
    setIsModalOpen(true);
  };

  const handleSaveFinance = async (data: CreateFinanceData) => {
    try {
      if (modalMode === "add") {
        await addFinance(data);
        toast.success("Movimentação adicionada com sucesso!");
      } else if (editingFinance) {
        await updateFinance(editingFinance.id, data);
        toast.success("Movimentação atualizada com sucesso!");
      }
      setEditingFinance(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        `Erro ao ${
          modalMode === "add" ? "adicionar" : "atualizar"
        } movimentação`
      );
    }
  };

  const handleDeleteClick = async (id: number) => {
    const finance = finances.find((f) => f.id === id);
    if (!finance) return;
    if (confirm(`Tem certeza que deseja excluir "${finance.description}"?`)) {
      try {
        await deleteFinance(id);
        toast.success(
          `Movimentação "${finance.description}" excluída com sucesso!`
        );
      } catch {
        toast.error("Erro ao excluir movimentação");
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen rounded-xl bg-white p-6 md:p-10">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-(--black)">
                Finanças
              </h1>

              <p className="mt-1 text-sm text-(--gray-2)">
                Gerencie suas receitas, despesas e saldo financeiro
              </p>
            </div>

            <button
              onClick={handleAddFinance}
              className="flex items-center gap-2 rounded-lg bg-(--green-500) px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 cursor-pointer"
            >
              <Plus size={18} />
              Adicionar Movimentação
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              value={formatCurrency(balance)}
              title="Saldo"
              icon={<Wallet size={52} />}
            />

            <SummaryCard
              value={formatCurrency(totalIncome)}
              title="Receitas"
              icon={
                <ArrowUpCircle
                  className="text-(--green-500)"
                  size={52}
                />
              }
            />

            <SummaryCard
              value={formatCurrency(totalExpense)}
              title="Despesas"
              icon={
                <ArrowDownCircle
                  className="text-(--danger)"
                  size={52}
                />
              }
            />
          </div>

          <FinanceTable
            finances={finances}
            onEdit={handleEditFinance}
            onDelete={handleDeleteClick}
          />

          <FinanceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveFinance}
            initialData={editingFinance || undefined}
            mode={modalMode}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}