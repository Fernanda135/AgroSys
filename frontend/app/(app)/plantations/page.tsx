"use client"

import { Sprout, TriangleAlert, Shapes, SquarePen, Trash2, CircleCheckBig } from "lucide-react";

import ProtectedRoute from '@/app/components/ProtectedRoute'
import SummaryCard from '@/app/components/SummaryCard'
import { usePlantations } from '@/app/hooks/usePlantation';
import { formatDate } from "@/app/utils/date";

export default function page() {

  const {
    plantations,
    totalCount,
    delayedCount,
    cultureCount
  } = usePlantations();

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

        <div className="p-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-4">Plantações</h1>
          <button className="bg-(--green-500) text-white py-1 px-2.5 rounded-sm cursor-pointer hover:bg-green-700" >Adicionar Plantação</button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            value={totalCount}
            title={"Total de\nplantaçoes"}
            icon={<Sprout className="text-(--green-500)" size={52} />}
          />

          <SummaryCard
            value={delayedCount}
            title={"Colheitas\natrasadas"}
            icon={<TriangleAlert className="text-(--warning)" size={52} />}
          />

          <SummaryCard
            value={cultureCount}
            title={"Tipos de\nculturas"}
            icon={<Shapes className="text-(--green-500)" size={52} />}
          />
        </div>

        <table className="w-full mt-8 bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-(--green-500) text-white">
            <tr>
              <th className="text-left px-4 py-3">Cultura</th>
              <th className="text-left px-4 py-3">Plantio</th>
              <th className="text-left px-4 py-3">Colheita</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Ações</th>
            </tr>
          </thead>

          <tbody>
            {plantations.map((plantation) => {
              const delayed =
                !plantation.isHarvested &&
                plantation.harvestDate &&
                new Date(plantation.harvestDate) < new Date();

              return (
                <tr
                  key={plantation.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-(--black) font-semibold">
                    {plantation.culture}
                  </td>

                  <td className="px-4 py-3 text-(--black) font-semibold">
                    {formatDate(plantation.plantingDate)}
                  </td>

                  <td className="px-4 py-3 text-(--black) font-semibold">
                    {formatDate(plantation.harvestDate)}
                  </td>

                  <td className="px-4 py-3 text-center font-semibold">
                    {plantation.isHarvested ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                        Colhida
                      </span>
                    ) : delayed ? (
                      <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                        Atrasada
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                        Em cultivo
                      </span>
                    )}
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
              );
            })}
          </tbody>
        </table>

      </div>
    </ProtectedRoute>
  )
}
