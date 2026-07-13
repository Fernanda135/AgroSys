import { useEffect, useMemo, useState } from "react";
import { Stock, stockService } from "@/app/services/stock.service";

export function useStocks() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadStocks() {
        try {
            setLoading(true);

            const data = await stockService.getAll();
            setStocks(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar o estoque.");
        } finally {
            setLoading(false);
        }
    }

    async function addStock(data: { product_name: string; category: string; quantity: number; unit_price: number; unit: string; }) {
            try {
                const newStock = await stockService.create({
                    product_name: data.product_name,
                    category: data.category,
                    quantity: data.quantity,
                    unit_price: data.unit_price,
                    unit: data.unit,
                });
                setStocks((prev) => [newStock, ...prev]);
                return newStock;
            } catch (err) {
                console.error(err);
                setError("Erro ao adicionar item no estoque.");
                throw err;
            }
        }
    
        async function updateStock(id: number, data: { product_name: string; category: string; quantity: number; unit_price: number; unit: string; }) {
            try {
                const updateStock = await stockService.update(id, {
                    product_name: data.product_name,
                    category: data.category,
                    quantity: data.quantity,
                    unit_price: data.unit_price,
                    unit: data.unit,
                });
                setStocks((prev) =>
                    prev.map((todo) => (todo.id === id ? updateStock : todo))
                );
                return updateStock;
            } catch (err) {
                console.error(err);
                setError("Erro ao atualizar item do estoque.");
                throw err;
            }
        }
    
        async function deleteStock(id: number) {
            try {
                await stockService.delete(id);
                setStocks((prev) => prev.filter((todo) => todo.id !== id));
            } catch (err) {
                console.error(err);
                setError("Erro ao deletar item do estoque.");
                throw err;
            }
        }

    useEffect(() => {
        loadStocks();
    }, []);

    const totalProducts = useMemo(() => stocks.length, [stocks]);

    const totalQuantity = useMemo(
        () => stocks.reduce((total, stock) => total + stock.quantity, 0),
        [stocks]
    );

    const lowStockProducts = useMemo(
        () => stocks.filter(stock => stock.quantity <= 5),
        [stocks]
    );

    const emptyStockProducts = useMemo(
        () => stocks.filter(stock => stock.quantity === 0),
        [stocks]
    );

    return {
        stocks,
        setStocks,
        loading,
        error,
        reload: loadStocks,

        addStock,
        updateStock,
        deleteStock,

        totalProducts,
        totalQuantity,

        lowStockProducts,
        lowStockCount: lowStockProducts.length,

        emptyStockProducts,
        emptyStockCount: emptyStockProducts.length,
    };
}