import api from "./api";

export interface Finance {
    id: number;
    user_id: number;
    isIncome: boolean;
    description: string;
    amount: number;
    transactionDate: string;
}

export const financeService = {
    async getAll() {
        const { data } = await api.get<Finance[]>("/finances");
        return data;
    },

    async create(finance: {
        isIncome: boolean;
        description: string;
        amount: number;
        transactionDate: string;
    }) {
        const { data } = await api.post("/finances", finance);
        return data;
    },

    async update(
        id: number,
        finance: Partial<{
            isIncome: boolean;
            description: string;
            amount: number;
            transactionDate: string;
        }>
    ) {
        const { data } = await api.put(`/finances/${id}`, finance);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete(`/finances/${id}`);
        return data;
    },
};