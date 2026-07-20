"use client";

import { ReactNode } from "react";

interface EmptyContainerProps {
    title: string;
    description: string;
    icon?: ReactNode;
    buttonText?: string;
    onButtonClick?: () => void;
}

export default function EmptyContainer({
    title,
    description,
    icon,
    buttonText,
    onButtonClick,
}: EmptyContainerProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-12 text-center">
            {icon && <div className="mb-5 text-(--gray-2)">{icon}</div>}

            <h2 className="text-lg font-semibold text-(--black)">{title}</h2>

            <p className="text-sm text-(--gray-2)">{description}</p>

            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="mt-6 rounded-xl bg-(--green-500) px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
}
