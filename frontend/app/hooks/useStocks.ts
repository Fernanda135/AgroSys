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

        totalProducts,
        totalQuantity,

        lowStockProducts,
        lowStockCount: lowStockProducts.length,

        emptyStockProducts,
        emptyStockCount: emptyStockProducts.length,
    };
}