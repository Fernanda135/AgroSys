import { ReactNode } from "react";

interface SummaryCardProps {
    value: number;
    title: string;
    icon: ReactNode;
}

export default function SummaryCard({
    value,
    title,
    icon,
}: SummaryCardProps) {
    return (
        <div className="flex h-40 items-center justify-between rounded-2xl border border-(--gray) bg-white px-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-col">
                <h2 className="text-5xl font-bold text-(--black)">
                    {value < 10 ? (
                        `0${value}`
                    ) : (
                        value
                    )}
                </h2>

                <p className="mt-2 whitespace-pre-line text-xl font-medium text-(--gray-2)">
                    {title}
                </p>
            </div>

            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-(--green-50)">
                {icon}
            </div>
        </div>
    );
}