"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Sprout,
  ClipboardList,
  Warehouse,
  Wallet,
} from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import EmptyContainer from "../../components/EmptyContainer";
import SummaryCard from "../../components/SummaryCard";

import TodoTable from "@/app/components/todo/TodoTable";
import PlantationStatusChart from "@/app/components/plantations/PlantationStatusChart";
import StockTable from "@/app/components/stock/StockTable";

import {
  Plantation,
  plantationService,
} from "@/app/services/plantation.service";

import {
  Todo,
  todoService,
} from "@/app/services/todo.service";

import {
  Stock,
  stockService,
} from "@/app/services/stock.service";

import {
  Sale,
  salesService,
} from "@/app/services/sale.service";

import { usePlantations } from "@/app/hooks/usePlantation";
import { formatCurrency } from "@/app/utils/currency";


export default function Dashboard() {

  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const { growthStatus } = usePlantations();


  useEffect(() => {

    async function loadData() {

      try {

        const [
          plantationsData,
          todosData,
          stocksData,
          salesData,

        ] = await Promise.all([

          plantationService.getAll(),

          todoService.getAll(),

          stockService.getAll(),

          salesService.getAll(),

        ]);


        setPlantations(
          plantationsData.data || []
        );

        setTodos(
          todosData.data || []
        );

        setStocks(
          stocksData.data || []
        );

        setSales(
          salesData.data || []
        );


      } catch (error) {

        console.error(
          "Erro ao carregar dashboard:",
          error
        );

      }

    }


    loadData();

  }, []);



  const totalSales = sales.reduce(
    (total, sale) =>
      total + Number(sale.total_price),
    0
  );


  const pendingSales = sales.filter(
    sale => sale.status === "PENDENTE"
  ).length;



  return (

    <ProtectedRoute>

      <div className="flex flex-col gap-5">


        {/* CARDS */}

        <div className="
          grid 
          grid-cols-1 
          gap-4 
          md:grid-cols-2 
          xl:grid-cols-3
        ">


          <SummaryCard
            value={plantations.length}
            title={"Plantações\nativas"}
            icon={<Sprout size={50} />}
          />


          <SummaryCard
            value={todos.length}
            title={"Tarefas\npendentes"}
            icon={<ClipboardList size={50} />}
          />


          <SummaryCard
            value={stocks.length}
            title={"Itens\nno estoque"}
            icon={<Warehouse size={50} />}
          />




        </div>



        {/* FINANCEIRO + PLANTAÇÕES */}

        <div className="
  rounded-2xl
  border
  border-(--gray)
  bg-white
  p-6
  shadow-sm
">

          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-full bg-(--green-50) p-3">
              <Wallet
                size={32}
                className="text-(--green-500)"
              />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Faturamento total
              </p>

              <h3 className="text-2xl font-bold">
                {formatCurrency(totalSales)}
              </h3>
            </div>
          </div>


          <h2 className="
    text-2xl
    font-bold
    mb-5
  ">
            Resumo Financeiro
          </h2>


          <div className="space-y-4">

            <div className="flex justify-between">
              <span>
                Total de vendas
              </span>

              <strong>
                {sales.length}
              </strong>
            </div>


            <div className="flex justify-between">
              <span>
                Vendas pendentes
              </span>

              <strong>
                {pendingSales}
              </strong>
            </div>

          </div>

        </div>





        {/* TAREFAS + ESTOQUE */}


        <div className="
          grid
          grid-cols-1
          gap-4
          xl:grid-cols-3
        ">


          <div className="xl:col-span-2">


            {
              todos.length > 0 ? (

                <div className="
                  rounded-2xl
                  border
                  border-(--gray)
                  bg-white
                  p-5
                  shadow-sm
                ">


                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  ">


                    <h2 className="
                      text-2xl
                      font-bold
                    ">
                      Tarefas
                    </h2>


                    <Link
                      href="/todo"
                      className="text-sm"
                    >
                      Ver tudo
                    </Link>


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
                />


              )
            }


          </div>





          <div className="
            rounded-2xl
            border
            border-(--gray)
            bg-white
            p-5
            shadow-sm
          ">


            <div className="
              flex
              justify-between
              items-center
              mb-4
            ">


              <h2 className="
                text-2xl
                font-bold
              ">
                Estoque
              </h2>


              <Link
                href="/stock"
                className="text-sm"
              >
                Ver tudo
              </Link>


            </div>



            {
              stocks.length > 0 ? (
                <StockTable
                  stocks={stocks.slice(0, 5)}
                  loading={false}
                  onEdit={() => { }}
                  onDelete={() => { }}
                  showActions={false}
                />


              ) : (


                <EmptyContainer
                  title="Nenhum registro no estoque!"
                  description="Adicione novos itens ao estoque."
                  icon={<Warehouse />}
                />


              )
            }


          </div>


        </div>



      </div>


    </ProtectedRoute>

  );

}