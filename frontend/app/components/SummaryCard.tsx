import { ReactNode } from "react";

interface SummaryCardProps {
    value: string | number;
    title: string;
    icon: ReactNode;
}

export default function SummaryCard({
    value,
    title,
    icon,
}: SummaryCardProps) {
    const displayValue =
        typeof value === "number"
            ? value < 10
                ? `0${value}`
                : value
            : value;

    return (
        <div className="flex h-40 items-center justify-between rounded-2xl border-(--gray) bg-white px-6 shadow-sm">
            <div className="flex flex-col">
                <h2 className="text-5xl font-bold text-(--black)">
                    {displayValue}
                </h2>

                <p className="mt-2 whitespace-pre-line text-xl font-medium text-(--gray-2)">
                    {title}
                </p>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-(--green-50) text-(--green-500)">
                {icon}
            </div>
        </div>
    );
}