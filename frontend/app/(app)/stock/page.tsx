"use client";

import { Package, Boxes, TriangleAlert, Ban, SquarePen, Trash2 } from "lucide-react";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SummaryCard from "@/app/components/SummaryCard";
import { useStocks } from "@/app/hooks/useStocks";

export default function StockPage() {
  const {
    stocks,
    loading,
    totalProducts,
    totalQuantity,
    lowStockCount,
  } = useStocks();

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Estoque</h1>

          <button className="bg-(--green-500) text-white py-2 px-4 rounded-md hover:bg-green-700 cursor-pointer">
            Adicionar Produto
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">

          <SummaryCard
            value={totalProducts}
            title={"Produtos\ncadastrados"}
            icon={<Package size={52} />}
          />

          <SummaryCard
            value={totalQuantity}
            title={"Itens em\nestoque"}
            icon={<Boxes size={52} />}
          />

          <SummaryCard
            value={lowStockCount}
            title={"Estoque\nbaixo"}
            icon={<TriangleAlert size={52} className="text-(--warning)" />}
          />

        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-5 py-3">Produto</th>
                <th className="text-center px-5 py-3">Quantidade</th>
                <th className="text-center px-5 py-3">Status</th>
                <th className="text-center px-5 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    Carregando...
                  </td>
                </tr>
              ) : stocks.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                stocks.map((stock) => (
                  <tr
                    key={stock.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {stock.product_name}
                    </td>

                    <td className="text-center font-semibold">
                      {stock.quantity}
                    </td>

                    <td className="text-center font-semibold">
                      {stock.quantity === 0 ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-(--danger)">
                          Sem estoque
                        </span>
                      ) : stock.quantity <= 5 ? (
                        <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-(--warning)">
                          Estoque baixo
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-(--green-500)">
                          Disponível
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="flex justify-center gap-4">
                        <button className="text-(--info) hover:text-blue-800 cursor-pointer">
                          <SquarePen size={20} />
                        </button>

                        <button className="text-(--danger) hover:text-red-800 cursor-pointer">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>

      </div>
    </ProtectedRoute>
  );
}