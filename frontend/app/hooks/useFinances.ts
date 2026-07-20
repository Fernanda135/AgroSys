import { useEffect, useMemo, useState } from "react";
import { Finance, financeService } from "@/app/services/finance.service";

export function useFinances() {
    const [finances, setFinances] = useState<Finance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadFinances() {
        try {
            setLoading(true);

            const response = await financeService.getAll();

            if (response.success) {
                setFinances(response.data);
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao carregar transações.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao carregar transações.");
            }

            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function addFinance(data: {
        isIncome: boolean;
        description: string;
        amount: number;
        transaction_date?: string;
        category?: string;
    }) {
        try {
            const response = await financeService.create({
                isIncome: data.isIncome,
                description: data.description,
                amount: data.amount,
                transaction_date:
                    data.transaction_date ||
                    new Date().toISOString().split("T")[0],
                category: data.category,
            });

            if (response.success) {
                setFinances(prev => [response.data, ...prev]);
                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao cadastrar transação.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao cadastrar transação.");
            }

            throw err;
        }
    }

    async function updateFinance(
        id: number,
        data: {
            isIncome?: boolean;
            description?: string;
            amount?: number;
            transaction_date?: string;
            category?: string;
        }
    ) {
        try {
            const response = await financeService.update(id, data);

            if (response.success) {
                setFinances(prev =>
                    prev.map(finance =>
                        finance.id === id ? response.data : finance
                    )
                );

                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao atualizar transação.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao atualizar transação.");
            }

            throw err;
        }
    }

    async function deleteFinance(id: number) {
        try {
            const response = await financeService.delete(id);

            if (response.success) {
                setFinances(prev =>
                    prev.filter(finance => finance.id !== id)
                );

                setError(null);
                return response;
            }

            throw new Error(response.message || "Erro ao excluir transação.");
        } catch (err) {
            console.error(err);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro ao excluir transação.");
            }

            throw err;
        }
    }

    useEffect(() => {
        loadFinances();
    }, []);

    const incomes = useMemo(
        () => finances.filter(finance => finance.isIncome),
        [finances]
    );

    const expenses = useMemo(
        () => finances.filter(finance => !finance.isIncome),
        [finances]
    );

    const totalIncome = useMemo(
        () =>
            incomes.reduce(
                (total, finance) => total + Number(finance.amount),
                0
            ),
        [incomes]
    );

    const totalExpense = useMemo(
        () =>
            expenses.reduce(
                (total, finance) => total + Number(finance.amount),
                0
            ),
        [expenses]
    );

    const balance = useMemo(
        () => totalIncome - totalExpense,
        [totalIncome, totalExpense]
    );

    const categories = useMemo(() => {
        const uniqueCategories = new Set(
            finances.map(finance => finance.category).filter(Boolean)
        );

        return Array.from(uniqueCategories);
    }, [finances]);

    const incomeByCategory = useMemo(() => {
        const result: Record<string, number> = {};

        incomes.forEach(finance => {
            const category = finance.category || "Sem categoria";
            result[category] =
                (result[category] || 0) + Number(finance.amount);
        });

        return result;
    }, [incomes]);

    const expenseByCategory = useMemo(() => {
        const result: Record<string, number> = {};

        expenses.forEach(finance => {
            const category = finance.category || "Sem categoria";
            result[category] =
                (result[category] || 0) + Number(finance.amount);
        });

        return result;
    }, [expenses]);

    return {
        finances,
        loading,
        error,

        reload: loadFinances,

        addFinance,
        updateFinance,
        deleteFinance,

        incomes,
        expenses,

        totalTransactions: finances.length,
        totalIncome,
        totalExpense,
        balance,

        categories,
        incomeByCategory,
        expenseByCategory,
    };
}