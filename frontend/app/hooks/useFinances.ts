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
            } else {
                setError("Erro ao carregar transações");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar transações.");
        } finally {
            setLoading(false);
        }
    }

    async function addFinance(data: {
        isIncome: boolean;
        description: string;
        amount: number;
        transactionDate?: string;
        category?: string;
    }) {
        try {
            const response = await financeService.create({
                isIncome: data.isIncome,
                description: data.description,
                amount: data.amount,
                transactionDate: data.transactionDate || new Date().toISOString().split('T')[0],
                category: data.category,
            });
            
            if (response.success) {
                setFinances((prev) => [response.data, ...prev]);
                return response.data;
            }
            throw new Error("Erro ao criar transação");
        } catch (err) {
            console.error(err);
            setError("Erro ao criar transação financeira.");
            throw err;
        }
    }

    async function updateFinance(id: number, data: {
        isIncome?: boolean;
        description?: string;
        amount?: number;
        transactionDate?: string;
        category?: string;
    }) {
        try {
            const response = await financeService.update(id, {
                isIncome: data.isIncome,
                description: data.description,
                amount: data.amount,
                transactionDate: data.transactionDate,
                category: data.category,
            });
            
            if (response.success) {
                setFinances((prev) =>
                    prev.map((finance) => (finance.id === id ? response.data : finance))
                );
                return response.data;
            }
            throw new Error("Erro ao atualizar transação");
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar transação financeira.");
            throw err;
        }
    }

    async function deleteFinance(id: number) {
        try {
            const response = await financeService.delete(id);
            if (response.success) {
                setFinances((prev) => prev.filter((finance) => finance.id !== id));
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao deletar transação financeira.");
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
        () => incomes.reduce((total, finance) => total + Number(finance.amount), 0),
        [incomes]
    );

    const totalExpense = useMemo(
        () => expenses.reduce((total, finance) => total + Number(finance.amount), 0),
        [expenses]
    );

    const balance = useMemo(
        () => totalIncome - totalExpense,
        [totalIncome, totalExpense]
    );

    const categories = useMemo(() => {
        const uniqueCategories = new Set(
            finances.map(f => f.category).filter(Boolean)
        );
        return Array.from(uniqueCategories);
    }, [finances]);

    const incomeByCategory = useMemo(() => {
        const result: Record<string, number> = {};
        incomes.forEach(f => {
            const cat = f.category || 'Sem categoria';
            result[cat] = (result[cat] || 0) + Number(f.amount);
        });
        return result;
    }, [incomes]);

    const expenseByCategory = useMemo(() => {
        const result: Record<string, number> = {};
        expenses.forEach(f => {
            const cat = f.category || 'Sem categoria';
            result[cat] = (result[cat] || 0) + Number(f.amount);
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