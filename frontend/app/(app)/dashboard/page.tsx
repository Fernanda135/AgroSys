"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Sprout, ClipboardList, Warehouse, Wallet } from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyContainer from "../../components/EmptyContainer";
import SummaryCard from "../../components/SummaryCard";

import { Plantation, plantationService } from "@/app/services/plantation.service";
import { Todo, todoService } from "@/app/services/todo.service";
import { Stock, stockService } from "@/app/services/stock.service";


export default function Dashboard() {

  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [plantationsData, todosData, stocksData] = await Promise.all([
          plantationService.getAll(),
          todoService.getAll(),
          stockService.getAll(),
        ]);

        setPlantations(plantationsData);
        setTodos(todosData);
        setStocks(stocksData);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plantations.length > 0 ? (
            <SummaryCard
              value={plantations.length}
              title={"Plantações\nativas"}
              icon={<Sprout className="text-(--green-500)" size={52} />}
            />
          ) : (
            <EmptyContainer
              title="Nenhuma plantação ativa!"
              description="Adicione novas plantações."
              icon={<Sprout />}
            />
          )}
          {todos.length > 0 ? (
            <SummaryCard
              value={todos.length}
              title={"Tarefas\npendentes"}
              icon={<ClipboardList className="text-(--green-500)" size={52} />}
            />
          ) : (
            <EmptyContainer
              title="Nenhuma tarefa pendente!"
              description="Adicione novas tarefas."
              icon={<ClipboardList />}
            />
          )}
          {stocks.length > 0 ? (
            <SummaryCard
              value={stocks.length}
              title={"Itens\nno estoque"}
              icon={<Warehouse className="text-(--green-500)" size={52} />}
            />
          ) : (
            <EmptyContainer
              title="Nenhum registro no estoque!"
              description="Adicione novos itens ao estoque."
              icon={<Warehouse />}
            />
          )}

        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">

          <EmptyContainer
            title="Nenhum registro financeiro encontrado!"
            description="Cadastre uma receita ou despesa para visualizar seus registros."
            icon={<Wallet />}
          />


          <EmptyContainer
            title="xxxxxxxxxxxxxx"
            description="xxxxxxxxxxxxxx"
            icon="XXXXXX"
          />

        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          <div className="xl:col-span-2">
            {todos && todos.length > 0 ? (
              <div className="flex flex-col rounded-2xl border border-(--gray) bg-white px-6 shadow-sm transition-shadow hover:shadow-md p-5 ">

                <div className="flex items-center justify-between w-full mb-4">
                  <h2 className="font-bold text-(--black) text-2xl" >Tarefas</h2>
                  <Link href="/todo"
                    className="text-(--black) text-[18px]"
                  >Ver tudo</Link>
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
            ) : (
              <EmptyContainer
                title="Nenhuma tarefa!"
                description="Adicione novas tarefas para visualizar."
                icon={<ClipboardList />}
              />)}

          </div>

          <div className="flex flex-col rounded-2xl border border-(--gray) bg-white px-6 shadow-sm transition-shadow hover:shadow-md p-5 ">
            <div>
              <h2 className="font-bold text-(--black) text-2xl" >Resumo do Estoque</h2>
            </div>

            {stocks && stocks.length > 0 ? (
              <div>
                <ul>
                  {stocks.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b border-(--gray) px-4 py-3"
                    >
                      <p className="text-(--black) font-medium">
                        {item.product_name}
                      </p>

                      <p className="text-(--black)">
                        {item.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyContainer
                title="Nenhum registro no estoque!"
                description="Adicione novos itens ao estoque."
                icon={<Warehouse />}
              />
            )}


          </div>

        </div>

      </div>
    </ProtectedRoute>
  );
}
