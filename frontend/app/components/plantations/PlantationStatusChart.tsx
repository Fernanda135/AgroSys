import { Pie, PieChart, Sector, PieSectorDataItem, Tooltip, TooltipIndex, ResponsiveContainer, Legend } from "recharts";
import { ChartPie } from "lucide-react";

import EmptyContainer from "../EmptyContainer";
import { PLANTATION_STATUS, PLANTATION_STATUS_LABELS } from "@/app/constants/plantation-status";

const defaultData = [
    {
        name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.PLANTED],
        value: 0,
        fill: "#38BDF8",
    },
    {
        name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.GROWING],
        value: 0,
        fill: "#22C55E",
    },
    {
        name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.READY],
        value: 0,
        fill: "#FACC15",
    },
    {
        name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.HARVESTED],
        value: 0,
        fill: "#16A34A",
    },
    {
        name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.DELAYED],
        value: 0,
        fill: "#c53030",
    },
];

const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
}: PieSectorDataItem) => {

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" fontSize={14} fontWeight="bold">
                {payload.name}
            </text>

            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />

            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />

        </g>
    );
};

interface Props {
    data?: {
        early: number;
        growing: number;
        mature: number;
        harvested: number;
        delayed: number;
    };
}

export default function PlantationStatusChart({
    data,
}: Props) {
    const chartData = data
        ? [
            {
                name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.PLANTED],
                value: data.early,
                fill: "#38BDF8",
            },
            {
                name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.GROWING],
                value: data.growing,
                fill: "#22C55E",
            },
            {
                name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.READY],
                value: data.mature,
                fill: "#FACC15",
            },
            {
                name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.HARVESTED],
                value: data.harvested,
                fill: "#16A34A",
            },
            {
                name: PLANTATION_STATUS_LABELS[PLANTATION_STATUS.DELAYED],
                value: data.delayed,
                fill: "#c53030"
            },
        ]
        : defaultData;

    const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
    const hasData = totalValue > 0;

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = totalValue > 0 ? ((data.value / totalValue) * 100).toFixed(0) : 0;

            return (
                <div className="bg-white p-4 rounded-lg shadow-lg border border-(--gray) min-w-40">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.fill }} />
                        <p className="text-sm font-semibold text-text-(--black)">{data.name}</p>
                    </div>
                    <p className="text-2xl font-bold text-(--black)">{data.value}</p>
                    <p className="text-sm text-(--gray-2)">plantações</p>
                    <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-sm text-(--black)">{percentage}% do total</p>
                        <div className="mt-1 w-full bg-(--gray) rounded-full h-1.5">
                            <div
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: `${percentage}%`,
                                    backgroundColor: data.fill
                                }}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (!hasData) {
        return (
            <EmptyContainer
                title="Sem dados"
                description="Nehuma plantação cadastrada"
                icon={<ChartPie />}
            />
        );
    }

    return (
        <div className="w-112.5 h-87.5">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        activeShape={renderActiveShape}
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        position={{ y: 50 }}
                    />

                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value: any) => (
                            <span className="text-sm text-gray-700">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}