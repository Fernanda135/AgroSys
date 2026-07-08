import { useEffect, useMemo, useState } from "react";
import { Finance, financeService } from "@/app/services/finance.service";

export function useFinances() {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFinances() {
    try {
      setLoading(true);

      const data = await financeService.getAll();
      setFinances(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar transações.");
    } finally {
      setLoading(false);
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

  return {
    finances,
    loading,
    error,
    reload: loadFinances,

    incomes,
    expenses,

    totalTransactions: finances.length,
    totalIncome,
    totalExpense,
    balance,
  };
}