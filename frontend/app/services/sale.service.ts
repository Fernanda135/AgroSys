import api from "./api";

export interface Sale {
    id: number;
    user_id: number;
    client_name: string;
    total_price: number;
    sale_date: string;
    payment_method: string;
    status: "PENDENTE" | "PAGO" | "CANCELADO";
    notes?: string;
    createdAt: string;
    updatedAt: string;
    items: {
        id: number;
        sale_id: number;
        stock_id: number;
        quantity: number;
        unit: string;
        unit_price: number;
        total_price: number;

        stock?: {
            id: number;
            product_name: string;
            unit: string;
        };
    }[];
}

export interface CreateSaleData {
    client_name: string;
    sale_date?: string;
    payment_method: string;
    status: "PENDENTE" | "PAGO" | "CANCELADO";
    notes?: string;
    items: {
        stock_id: number;
        quantity: number;
        unit: string;
        unit_price: number;
        total_price: number;
    }[];
}

export interface UpdateSaleData {
    client_name?: string;
    sale_date?: string;
    payment_method?: string;
    status?: "PENDENTE" | "PAGO" | "CANCELADO";
    notes?: string;
}

export interface SaleSummary {
    totalSales: number;
    totalRecords: number;
}

export interface SalesResponse {
    success: boolean;
    message: string;
    data: Sale[];
    summary?: SaleSummary;
}

export interface SingleSaleResponse {
    success: boolean;
    message: string;
    data: Sale;
}

export interface DeleteSaleResponse {
    success: boolean;
    message: string;
}

export const salesService = {
    async getAll() {
        const { data } = await api.get<SalesResponse>("/sales");
        return data;
    },

    async getById(id: number) {
        const { data } = await api.get<SingleSaleResponse>(`/sales/${id}`);
        return data;
    },

    async create(sale: CreateSaleData) {
        const { data } = await api.post<SingleSaleResponse>("/sales", sale);
        return data;
    },

    async update(id: number, sale: UpdateSaleData) {
        const { data } = await api.put<SingleSaleResponse>(`/sales/${id}`, sale);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete<DeleteSaleResponse>(`/sales/${id}`);
        return data;
    },

    async getSummary() {
        const { data } = await api.get<{
            success: boolean;
            summary: SaleSummary;
        }>("/sales");

        return data;
    }
};