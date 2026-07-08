"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Clock, CircleCheckBig, Trash2, SquarePen } from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useTodos } from "@/app/hooks/useTodo";
import SummaryCard from "@/app/components/SummaryCard";

export default function ToDo() {

  const {
    todos,
    totalCount,
    pendingCount,
    completedCount,
  } = useTodos();


  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

        <div className="p-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-4">Tarefas</h1>
          <button className="bg-(--green-500) text-white py-1 px-2.5 rounded-sm cursor-pointer hover:bg-green-700" >Adicionar Tarefa</button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            value={totalCount}
            title={"Total de\ntarefas"}
            icon={<ClipboardList className="text-(--green-500)" size={52} />}
          />

          <SummaryCard
            value={pendingCount}
            title={"Tarefas\npendentes"}
            icon={<Clock className="text-(--warning)" size={52} />}
          />

          <SummaryCard
            value={completedCount}
            title={"Tarefas\nconcluídas"}
            icon={<CircleCheckBig className="text-(--green-500)" size={52} />}
          />
        </div>

        <table className="w-full mt-8 bg-white rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-(--gray-2) text-(--black)">
              <th className="text-left px-4 py-3">
                Nome
              </th>
              <th className="text-left px-4 py-3">
                Descrição
              </th>
              <th className="text-left px-4 py-3">
                Status
              </th>
              <th className="text-left px-4 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((t) => (
              <tr
                key={t.id}
                className="border-t border-(--gray) hover:bg-(--gray-1) transition-colors"
              >
                <td className="px-4 py-3 text-(--black) font-semibold">
                  {t.title}
                </td>
                <td className="px-4 py-3 text-(--black) font-semibold">
                  {t.description}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${t.completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {t.completed ? "Concluída" : "Pendente"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">

                    <button className="text-(--green-500) cursor-pointer hover:text-green-700">
                      <CircleCheckBig size={20} />
                    </button>

                    <button className="text-(--info) cursor-pointer hover:text-blue-900">
                      <SquarePen size={20} />
                    </button>

                    <button className="text-(--danger) cursor-pointer hover:text-red-80">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </ProtectedRoute>
  );
}
