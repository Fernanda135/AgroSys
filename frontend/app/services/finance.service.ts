import api from "./api";

export interface Finance {
    id: number;
    user_id: number;
    isIncome: boolean;
    description: string;
    amount: number;
    category?: string;
    transaction_date: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateFinanceData {
    isIncome: boolean;
    description: string;
    amount: number;
    category?: string;
    transaction_date?: string;
}

export interface UpdateFinanceData {
    isIncome?: boolean;
    description?: string;
    amount?: number;
    category?: string;
    transaction_date?: string;
}

export interface FinanceSummary {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

export interface FinanceResponse {
    success: boolean;
    message: string;
    data: Finance[];
    summary?: FinanceSummary;
}

export interface SingleFinanceResponse {
    success: boolean;
    message: string;
    data: Finance;
}

export interface DeleteFinanceResponse {
    success: boolean;
    message: string;
}

export const financeService = {

    async getAll() {
        const { data } = await api.get<FinanceResponse>("/finances");
        return data;
    },

    async getById(id: number) {
        const { data } = await api.get<SingleFinanceResponse>(`/finances/${id}`);
        return data;
    },

    async create(finance: CreateFinanceData) {
        const { data } = await api.post<SingleFinanceResponse>("/finances", finance);
        return data;
    },

    async update(id: number, finance: UpdateFinanceData) {
        const { data } = await api.put<SingleFinanceResponse>(`/finances/${id}`, finance);
        return data;
    },

    async delete(id: number) {
        const { data } = await api.delete<DeleteFinanceResponse>(`/finances/${id}`);
        return data;
    },

    async getSummary() {
        const { data } = await api.get<{ success: boolean; data: FinanceSummary }>("/finances/summary");
        return data;
    },

    async getByPeriod(month: number, year: number) {
        const { data } = await api.get<FinanceResponse>(`/finances/period?month=${month}&year=${year}`);
        return data;
    },

    async getByType(isIncome: boolean) {
        const { data } = await api.get<FinanceResponse>(`/finances?isIncome=${isIncome}`);
        return data;
    },

    async getByCategory(isIncome?: boolean) {
        const url = isIncome !== undefined
            ? `/finances/categories?isIncome=${isIncome}`
            : "/finances/categories";
        const { data } = await api.get(url);
        return data;
    }
};