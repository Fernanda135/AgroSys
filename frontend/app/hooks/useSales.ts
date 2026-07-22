import { useEffect, useMemo, useState } from "react";
import {
    Sale,
    CreateSaleData,
    UpdateSaleData,
    salesService,
} from "@/app/services/sale.service";

export function useSales() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadSales() {
        try {
            setLoading(true);
            const response = await salesService.getAll();
            if (response.success) {
                setSales(response.data);
                setError(null);
                return response;
            }
            throw new Error(
                response.message ||
                "Erro ao carregar vendas."
            );
        } catch (err) {
            console.error(err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Erro ao carregar vendas."
            );
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function addSale(data: CreateSaleData) {
        try {
            const response =
                await salesService.create(data);
            if (response.success) {
                setSales(prev => [
                    response.data,
                    ...prev
                ]);
                return response;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async function updateSale(
        id: number,
        data: UpdateSaleData
    ) {
        try {
            const response =
                await salesService.update(id, data);
            if (response.success) {
                setSales(prev =>
                    prev.map(sale =>
                        sale.id === id
                            ? response.data
                            : sale
                    )
                );
                return response;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async function deleteSale(id: number) {
        try {
            const response =
                await salesService.delete(id);
            if (response.success) {
                setSales(prev =>
                    prev.filter(
                        sale => sale.id !== id
                    )
                );
                return response;
            }
            throw new Error(response.message);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    useEffect(() => {
        loadSales();
    }, []);
    

    const totalSales = useMemo(() => {
        return sales.reduce(
            (sum, sale) =>
                sum + Number(sale.total_price),
            0
        );
    }, [sales]);

    const totalQuantity = useMemo(() => {
        return sales.reduce(
            (sum, sale) =>
                sum +
                (sale.items || []).reduce(
                    (itemSum, item) =>
                        itemSum + Number(item.quantity),
                    0
                ),
            0
        );
    }, [sales]);

    const averageTicket = useMemo(() => {
        return sales.length
            ? totalSales / sales.length
            : 0;
    }, [
        sales.length,
        totalSales
    ]);

    const pendingSales = useMemo(() => {
        return sales.filter(
            sale => sale.status === "PENDENTE"
        );
    }, [sales]);

    const paidSales = useMemo(() => {
        return sales.filter(
            sale => sale.status === "PAGO"
        );
    }, [sales]);

    const cancelledSales = useMemo(() => {
        return sales.filter(
            sale => sale.status === "CANCELADO"
        );
    }, [sales]);


    const monthlySales = useMemo(() => {
        const months: Record<string, number> = {};
        sales.forEach(sale => {
            const month =
                new Date(
                    sale.sale_date
                )
                    .toLocaleDateString(
                        "pt-BR",
                        {
                            month: "short",
                            year: "2-digit"
                        }
                    );
            months[month] =
                (months[month] || 0)
                +
                Number(sale.total_price);
        });
        return Object.entries(months)
            .map(([month, total]) => ({
                month,
                total
            }));
    }, [sales]);


    const salesByProduct = useMemo(() => {
        const products:
            Record<string, {
                quantity: number;
                total: number;
            }> = {};
        sales.forEach(sale => {
            (sale.items || [])
                .forEach(item => {
                    const product =
                        item.stock?.product_name ||
                        "Produto não identificado";
                    if (!products[product]) {
                        products[product] = {
                            quantity: 0,
                            total: 0
                        };
                    }
                    products[product].quantity +=
                        Number(item.quantity);
                    products[product].total +=
                        Number(item.total_price);
                });
        });
        return Object.entries(products)
            .map(([name, data]) => ({
                name,
                quantity: data.quantity,
                total: data.total
            }));
    }, [sales]);


    const salesByPayment = useMemo(() => {
        const payments:
            Record<string, number> = {};
        sales.forEach(sale => {
            const method =
                sale.payment_method ||
                "Não informado";
            payments[method] =
                (payments[method] || 0)
                +
                Number(sale.total_price);
        });
        return Object.entries(payments)
            .map(([method, total]) => ({
                method,
                total
            }));
    }, [sales]);

    const salesByStatus = useMemo(() => [
        {
            name: "Pagas",
            value: paidSales.length
        },
        {
            name: "Pendentes",
            value: pendingSales.length
        },
        {
            name: "Canceladas",
            value: cancelledSales.length
        }
    ], [
        paidSales,
        pendingSales,
        cancelledSales
    ]);

    return {
        sales,
        loading,
        error,
        reload: loadSales,
        addSale,
        updateSale,
        deleteSale,
        totalSales,
        totalQuantity,
        averageTicket,
        totalRecords: sales.length,
        paidSales,
        pendingSales,
        cancelledSales,
        monthlySales,
        salesByProduct,
        salesByPayment,
        salesByStatus,
    };
}