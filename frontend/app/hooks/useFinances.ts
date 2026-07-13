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

  async function addFinance(data: { isIncome: boolean; description: string; amount: number; transactionDate: string; }) {
              try {
                  const newFinance = await financeService.create({
                      isIncome: data.isIncome,
                      description: data.description,
                      amount: data.amount,
                      transactionDate: data.transactionDate,
                  });
                  setFinances((prev) => [newFinance, ...prev]);
                  return newFinance;
              } catch (err) {
                  console.error(err);
                  setError("Erro ao adicionar item no estoque.");
                  throw err;
              }
          }
      
          async function updateFinance(id: number, data: { isIncome: boolean; description: string; amount: number; transactionDate: string; }) {
              try {
                  const updateFinance = await financeService.update(id, {
                      isIncome: data.isIncome,
                      description: data.description,
                      amount: data.amount,
                      transactionDate: data.transactionDate,
                  });
                  setFinances((prev) =>
                      prev.map((todo) => (todo.id === id ? updateFinance : todo))
                  );
                  return updateFinance;
              } catch (err) {
                  console.error(err);
                  setError("Erro ao atualizar item do estoque.");
                  throw err;
              }
          }
      
          async function deleteFinance(id: number) {
              try {
                  await financeService.delete(id);
                  setFinances((prev) => prev.filter((todo) => todo.id !== id));
              } catch (err) {
                  console.error(err);
                  setError("Erro ao deletar item do estoque.");
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
  };
}