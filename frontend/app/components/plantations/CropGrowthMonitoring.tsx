// CropGrowthMonitoring.tsx - Versão Simplificada
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartColumnBig } from 'lucide-react';

import { Plantation } from '@/app/services/plantation.service';
import EmptyContainer from '../EmptyContainer';
import { formatKg, formatKgShort } from '@/app/utils/formatKg';
import { PLANTATION_STATUS } from '@/app/constants/plantation-status';

interface CropGrowthMonitoringProps {
    plantations: Plantation[];
}

export default function CropGrowthMonitoring({ plantations }: CropGrowthMonitoringProps) {

    const data = useMemo(() => {
        return plantations.reduce((acc: any[], p) => {
            const existing = acc.find(item => item.name === p.culture);
            if (existing) {
                existing.count += 1;
                existing.production += Number(p.expected_production ?? 0);
                existing.quantity += p.quantity_planted || 0;
            } else {
                acc.push({
                    name: p.culture,
                    count: 1,
                    production: Number(p.expected_production ?? 0),
                    quantity: p.quantity_planted || 0,
                });
            }
            return acc;
        }, []);
    }, [plantations]);

    const totalPlantations = plantations.length;
    const totalCultures = data.length;
    const totalProduction = formatKg(plantations.reduce((sum, p) => sum + Number(p.expected_production ?? 0), 0));
    const harvested = plantations.filter(p => p.status === PLANTATION_STATUS.HARVESTED).length;

    if (plantations.length === 0) {
        return (
            <div className='mt-8'>
                <EmptyContainer
                    title='Nehuma plantação cadastrada'
                    description='Cadastre novas plantações'
                    icon={<ChartColumnBig />}
                />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow p-6 mt-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Resumo por Cultura
                    </h3>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                        <strong>{totalCultures}</strong> culturas
                    </span>
                    <span className="text-gray-600">
                        <strong>{totalPlantations}</strong> plantações
                    </span>
                    <span className="text-green-600">
                        <strong>{harvested}</strong> colhidas
                    </span>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => formatKgShort(value)} />
                        <Tooltip
                            formatter={(value: any, name: any) => {
                                if (name === 'Produção') {
                                    return [formatKgShort(value), name];
                                }
                                return [value, name];
                            }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="count" fill="#4CAF50" name="Plantações" />
                        <Bar yAxisId="right" dataKey="production" fill="#2196F3" name="Produção" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                    <p className="text-xs text-gray-500">Total de Plantações</p>
                    <p className="text-xl font-bold text-gray-800">{totalPlantations}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500">Produção Total</p>
                    <p className="text-xl font-bold text-gray-800">{totalProduction}</p>
                </div>
                <div className="text-center">
                    <p className="text-xs text-gray-500">Taxa de Colheita</p>
                    <p className="text-xl font-bold text-gray-800">
                        {totalPlantations > 0 ? Math.round((harvested / totalPlantations) * 100) : 0}%
                    </p>
                </div>
            </div>
        </div>
    );
}