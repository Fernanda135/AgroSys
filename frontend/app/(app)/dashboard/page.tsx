"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Sprout, ClipboardList, Warehouse, Wallet } from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyContainer from "../../components/EmptyContainer";
import SummaryCard from "../../components/SummaryCard";
import TodoTable from "@/app/components/todo/TodoTable";

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

        setPlantations(plantationsData.data || []);
        setTodos(todosData.data || []);
        setStocks(stocksData.data || []);
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
              icon={<Sprout size={52} />}
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
              icon={<ClipboardList size={52} />}
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
              icon={<Warehouse size={52} />}
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

                <div className="flex items-center justify-between w-full">
                  <h2 className="font-bold text-(--black) text-2xl" >Tarefas</h2>
                  <Link href="/todo"
                    className="text-(--black) text-[18px]"
                  >Ver tudo</Link>
                </div>

                <TodoTable
                  todos={todos}
                  showActions={false}
                  />

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
                      <p className="text-(--black) font-semibold">
                        {item.product_name}
                      </p>

                      <p className="text-(--black) font-semibold">
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
