"use client";

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function LogoutModal({
    isOpen,
    onClose,
    onConfirm,
}: LogoutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-96">
                <h1 className="text-xl font-bold">
                    Tem certeza que deseja sair?
                </h1>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-(--danger) text-white cursor-pointer"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </div>
    );
}