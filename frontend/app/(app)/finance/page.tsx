"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Wallet,
  SquarePen,
  Trash2,
} from "lucide-react";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import SummaryCard from "@/app/components/SummaryCard";
import { useFinances } from "@/app/hooks/useFinances";
import { formatCurrency } from "@/app/utils/currency";
import { formatDate } from "@/app/utils/date";

export default function FinancePage() {
  const {
    finances,
    loading,
    totalIncome,
    totalExpense,
    balance,
  } = useFinances();

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Financeiro</h1>

          <button className="bg-(--green-500) text-white py-2 px-4 rounded-md hover:bg-green-700">
            Nova Transação
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">

          <SummaryCard
            value={formatCurrency(totalIncome)}
            title={"Receitas"}
            icon={<ArrowUpCircle size={52} className="text-(--green-500)" />}
          />

          <SummaryCard
            value={formatCurrency(totalExpense)}
            title={"Despesas"}
            icon={<ArrowDownCircle size={52} className="text-(--warning)" />}
          />

          <SummaryCard
            value={formatCurrency(balance)}
            title={"Saldo\ntotal"}
            icon={<Wallet size={52} className="text-(--green-500)" />}
          />

        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-5 py-3">Descrição</th>
                <th className="text-center px-5 py-3">Tipo</th>
                <th className="text-center px-5 py-3">Valor</th>
                <th className="text-center px-5 py-3">Data</th>
                <th className="text-center px-5 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    Carregando...
                  </td>
                </tr>
              ) : finances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    Nenhuma transação cadastrada.
                  </td>
                </tr>
              ) : (
                finances.map(finance => (
                  <tr
                    key={finance.id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {finance.description}
                    </td>

                    <td className="text-center font-semibold">
                      {finance.isIncome ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                          Receita
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                          Despesa
                        </span>
                      )}
                    </td>

                    <td
                      className={`text-center font-semibold ${
                        finance.isIncome
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(Number(finance.amount))}
                    </td>

                    <td className="text-center font-semibold">
                      {formatDate(finance.transactionDate)}
                    </td>

                    <td>
                      <div className="flex justify-center gap-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          <SquarePen size={20} />
                        </button>

                        <button className="text-red-600 hover:text-red-800">
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