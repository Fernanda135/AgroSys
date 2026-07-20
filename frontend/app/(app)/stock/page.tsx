"use client";

import { useState } from "react";
import { Package, Boxes, TriangleAlert } from "lucide-react";
import { toast } from "react-toastify";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SummaryCard from "@/app/components/SummaryCard";
import { useStocks } from "@/app/hooks/useStocks";
import { Stock, CreateStockData } from "@/app/services/stock.service";
import StockModal from "@/app/components/stock/StockModal";
import StockTable from "@/app/components/stock/StockTable";

export default function StockPage() {
  const {
    stocks,
    loading,
    totalProducts,
    totalQuantity,
    lowStockCount,
    addStock,
    updateStock,
    deleteStock,
  } = useStocks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingStock, setEditingStock] = useState<Stock | null>(null);

  const handleAddStock = () => {
    setModalMode("add");
    setEditingStock(null);
    setIsModalOpen(true);
  };

  const handleEditStock = (stock: Stock) => {
    setModalMode("edit");
    setEditingStock(stock);
    setIsModalOpen(true);
  };

  const handleSaveStock = async (data: CreateStockData) => {
    try {
      if (modalMode === "add") {
        await addStock(data);
        toast.success(
          `Produto "${data.product_name}" adicionado com sucesso!`
        );
      } else if (editingStock) {
        await updateStock(editingStock.id, data);
        toast.success(
          `Produto "${data.product_name}" atualizado com sucesso!`
        );
      }

      setEditingStock(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          `Erro ao ${modalMode === "add" ? "adicionar" : "atualizar"
          } produto.`
        );
      }
    }
  };

  const handleDeleteClick = async (id: number) => {
    const stock = stocks.find((s) => s.id === id);

    if (!stock) return;

    const confirmMessage = `Tem certeza que deseja excluir "${stock.product_name}"? Esta ação não pode ser desfeita.`;

    if (confirm(confirmMessage)) {
      try {
        await deleteStock(id);
        toast.success(
          `Produto "${stock.product_name}" excluído com sucesso!`
        );
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Erro ao excluir produto.");
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
              <h1 className="text-3xl font-bold text-(--black)">Estoque</h1>
              <p className="mt-1 text-sm text-(--gray-2)">
                Gerencie seus insumos, equipamentos e produtos agrícolas
              </p>
            </div>
            <button
              onClick={handleAddStock}
              className="flex items-center gap-2 rounded-lg bg-(--green-500) px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 cursor-pointer"
            >
              <Package size={18} />
              Adicionar Produto
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              value={totalProducts}
              title="Produtos cadastrados"
              icon={<Package size={50} />}
            />
            <SummaryCard
              value={totalQuantity}
              title="Itens em estoque"
              icon={<Boxes size={50} />}
            />
            <SummaryCard
              value={lowStockCount}
              title="Estoque baixo"
              icon={<TriangleAlert className="text-(--warning)" size={50} />}
            />
          </div>

          <StockTable
            stocks={stocks}
            loading={loading}
            onEdit={handleEditStock}
            onDelete={handleDeleteClick}
          />

          <StockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveStock}
            initialData={
              editingStock
                ? {
                  ...editingStock,
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