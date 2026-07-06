"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Clock, CircleCheckBig } from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import { Todo, todoService } from "@/app/services/todo.service";
import { useTodoFilters } from "@/app/hooks/useTodo";
import SummaryCard from "@/app/components/SummaryCard";

export default function ToDo() {

  const [todos, setTodos] = useState<Todo[]>([]);
  const { pendingCount, completedCount, totalCount, completionRate } = useTodoFilters(todos);

  useEffect(() => {
    async function loadData() {
      try {
        const todosData = await todoService.getAll();
        setTodos(todosData);

      } catch (error) {
        console.error("Erro ao carregar tarefass:", error);
      }
    }

    loadData();
  }, []);


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

        <div className="overflow-hidden rounded-xl border border-(--gray) bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-(--gray-2)">
                <th className="px-4 py-3 text-left text-sm font-semibold text-(--black)">
                  Nome
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-(--black)">
                  Descrição
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-(--black)">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {todos.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-(--gray) hover:bg-(--gray-1) transition-colors"
                >
                  <td className="px-4 py-3 text-(--black) font-medium">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-(--black)">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>

    </ProtectedRoute>
  );
}
