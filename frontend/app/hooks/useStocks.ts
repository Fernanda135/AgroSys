import { useEffect, useMemo, useState } from "react";
import { Stock, stockService } from "@/app/services/stock.service";

export function useStocks() {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadStocks() {
        try {
            setLoading(true);
            const response = await stockService.getAll();
            
            if (response.success) {
                setStocks(response.data);
                setError(null);
            } else {
                setError("Erro ao carregar estoque");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar o estoque.");
        } finally {
            setLoading(false);
        }
    }

    async function addStock(data: {
        product_name: string;
        category?: string;
        quantity: number;
        unit_price: number;
        unit?: string;
    }) {
        try {
            const response = await stockService.create({
                product_name: data.product_name,
                category: data.category,
                quantity: data.quantity,
                unit_price: data.unit_price,
                unit: data.unit || "un",
            });
            
            if (response.success) {
                setStocks((prev) => [response.data, ...prev]);
                return response.data;
            }
            throw new Error("Erro ao adicionar item");
        } catch (err) {
            console.error(err);
            setError("Erro ao adicionar item no estoque.");
            throw err;
        }
    }

    async function updateStock(id: number, data: {
        product_name?: string;
        category?: string;
        quantity?: number;
        unit_price?: number;
        unit?: string;
    }) {
        try {
            const response = await stockService.update(id, {
                product_name: data.product_name,
                category: data.category,
                quantity: data.quantity,
                unit_price: data.unit_price,
                unit: data.unit,
            });
            
            if (response.success) {
                setStocks((prev) =>
                    prev.map((stock) => (stock.id === id ? response.data : stock))
                );
                return response.data;
            }
            throw new Error("Erro ao atualizar item");
        } catch (err) {
            console.error(err);
            setError("Erro ao atualizar item do estoque.");
            throw err;
        }
    }

    async function addQuantity(id: number, quantity: number) {
        try {
            const response = await stockService.addQuantity(id, quantity);
            
            if (response.success) {
                setStocks((prev) =>
                    prev.map((stock) => (stock.id === id ? response.data : stock))
                );
                return response.data;
            }
            throw new Error("Erro ao adicionar quantidade");
        } catch (err) {
            console.error(err);
            setError("Erro ao adicionar quantidade ao estoque.");
            throw err;
        }
    }

    async function deleteStock(id: number) {
        try {
            const response = await stockService.delete(id);
            if (response.success) {
                setStocks((prev) => prev.filter((stock) => stock.id !== id));
            }
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

    const totalValue = useMemo(
        () => stocks.reduce((total, stock) => total + (stock.quantity * stock.unit_price), 0),
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

    const categories = useMemo(() => {
        const uniqueCategories = new Set(
            stocks.map(s => s.category).filter(Boolean)
        );
        return Array.from(uniqueCategories);
    }, [stocks]);

    return {
        stocks,
        setStocks,
        loading,
        error,
        reload: loadStocks,

        addStock,
        updateStock,
        addQuantity,
        deleteStock,

        totalProducts,
        totalQuantity,
        totalValue,

        lowStockProducts,
        lowStockCount: lowStockProducts.length,

        emptyStockProducts,
        emptyStockCount: emptyStockProducts.length,

        categories,
        categoryCount: categories.length,
    };
}