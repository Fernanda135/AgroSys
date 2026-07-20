import { Pie, PieChart, Sector, PieSectorDataItem, Tooltip, TooltipIndex, ResponsiveContainer, Legend } from "recharts";
import EmptyContainer from "../EmptyContainer";

const defaultData = [
    { name: "Inicial", value: 0, fill: "#38BDF8" },
    { name: "Em crescimento", value: 0, fill: "#22C55E" },
    { name: "Madura", value: 0, fill: "#FACC15" },
    { name: "Colhida", value: 0, fill: "#16A34A" },
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
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 0));
    const cos = Math.cos(-RADIAN * (midAngle ?? 0));

    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = (cx ?? 0) + (outerRadius ?? 0) + 80;
    const ey = cy ?? 0;

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
    };
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
}

export default function PlantationStatusChart({
    data,
    isAnimationActive = true,
    defaultIndex
}: Props) {
    // Calcular dados do gráfico
    const chartData = data ? [
        { name: "Inicial", value: data.early, fill: "#38BDF8" },
        { name: "Em crescimento", value: data.growing, fill: "#22C55E" },
        { name: "Madura", value: data.mature, fill: "#FACC15" },
        { name: "Colhida", value: data.harvested, fill: "#16A34A" }
    ] : defaultData;

    // Calcular total dentro do componente
    const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
    const hasData = totalValue > 0;

    // Tooltip personalizado com acesso ao totalValue
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

    // Se não houver dados, mostra mensagem
    if (!hasData) {
        return (
            <EmptyContainer
            title="Sem dados"
            description="Nehuma plantação cadastrada"
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
                        isAnimationActive={isAnimationActive}
                    />

                    <Tooltip 
                        content={<CustomTooltip />}
                        position={{ y: 50 }}
                    />

                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value, entry: any) => (
                            <span className="text-sm text-gray-700">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}