"use client";

import { useState } from "react";
import {
  ShoppingCart,
  DollarSign,
  Package,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SummaryCard from "@/app/components/SummaryCard";
import SaleModal from "@/app/components/sales/SaleModal";
import SaleTable from "@/app/components/sales/SalesTable";
import { useSales } from "@/app/hooks/useSales";
import {
  Sale,
  CreateSaleData,
  UpdateSaleData
} from "@/app/services/sale.service";
import { formatCurrency } from "@/app/utils/currency";

export default function SalesPage() {
  const {
    sales,
    totalSales,
    totalQuantity,
    averageTicket,
    addSale,
    updateSale,
    deleteSale,
  } = useSales();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingSale, setEditingSale] = useState<Sale | null>(null);

  const handleSave = async (data: CreateSaleData) => {
    try {
      const response =
        modalMode === "add"
          ? await addSale(data)
          : editingSale
            ? await updateSale(editingSale.id, {
              client_name: data.client_name,
              sale_date: data.sale_date,
              payment_method: data.payment_method,
              status: data.status,
              notes: data.notes,
            })
            : null;

      if (!response) return;

      toast.success(response.message);
      setEditingSale(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Erro ao salvar venda");
    }
  };

  const handleAdd = async (data: CreateSaleData) => {
    try {
      const response = await addSale(data);
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error("Erro ao adicionar venda");
      throw error;
    }
  };

  const handleEdit = async (id: number, data: UpdateSaleData) => {
    try {
      const response = await updateSale(id, data);
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error("Erro ao editar venda");
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteSale(id);
      toast.success("Venda excluída com sucesso!");
      return response;
    } catch (error) {
      toast.error("Erro ao excluir venda");
      throw error;
    }
  };

  const handleStatusChange = async (id: number, status: "PENDENTE" | "PAGO" | "CANCELADO") => {
    try {
      const response = await updateSale(id, { status });
      toast.success(`Status atualizado para ${status === "PAGO" ? "Pago" : "Pendente"}`);
      return response;
    } catch (error) {
      toast.error("Erro ao atualizar status");
      throw error;
    }
  };

  const handleEditClick = (sale: Sale) => {
    setEditingSale(sale);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen rounded-xl bg-white p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Vendas</h1>
              <p className="text-(--gray-2)">
                Gerencie as vendas da sua produção
              </p>
            </div>

            <button
              onClick={() => {
                setModalMode("add");
                setEditingSale(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg bg-(--green-500) px-5 py-2.5 text-white hover:bg-green-700 transition-colors cursor-pointer"
            >
              <Plus size={18} />
              Nova Venda
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              value={sales.length}
              title="Total de Vendas"
              icon={<ShoppingCart size={50} />}
            />
            <SummaryCard
              value={formatCurrency(totalSales)}
              title="Faturamento Total"
              icon={<DollarSign size={50} />}
            />
            <SummaryCard
              value={totalQuantity}
              title="Quantidade Vendida"
              icon={<Package size={50} />}
            />
          </div>

          <SaleTable
            sales={sales}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />

          <SaleModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingSale(null);
            }}
            onSave={handleSave}
            initialData={editingSale || undefined}
            mode={modalMode}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}