import api from "./api";

export interface Stock {
  id: number;
  user_id: number;
  product_name: string;
  category: string | null;
  quantity: number;
  unit_price: number;
  unit: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStockData {
  product_name: string;
  category?: string;
  quantity: number;
  unit_price: number;
  unit?: string;
}

export interface UpdateStockData {
  product_name?: string;
  category?: string;
  quantity?: number;
  unit_price?: number;
  unit?: string;
}

export interface AddQuantityData {
  quantity: number;
}

export interface StockResponse {
  success: boolean;
  message: string;
  data: Stock[];
  totalValue?: number;
}

export interface SingleStockResponse {
  success: boolean;
  message: string;
  data: Stock;
}

export interface DeleteStockResponse {
  success: boolean;
  message: string;
}

export interface CategoryStats {
  category: string;
  count: number;
  totalQuantity: number;
}

export interface TotalValueResponse {
  success: boolean;
  totalValue: number;
  currency: string;
}


export const stockService = {

  async getAll(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    minQuantity?: number;
    maxQuantity?: number;
  }) {
    const { data } = await api.get<StockResponse>("/stocks", { params });
    return data;
  },

  async getById(id: number) {
    const { data } = await api.get<SingleStockResponse>(`/stocks/${id}`);
    return data;
  },

  async create(stock: CreateStockData) {
    const { data } = await api.post<SingleStockResponse>("/stocks", stock);
    return data;
  },

  async update(id: number, stock: UpdateStockData) {
    const { data } = await api.put<SingleStockResponse>(`/stocks/${id}`, stock);
    return data;
  },

  async delete(id: number) {
    const { data } = await api.delete<DeleteStockResponse>(`/stocks/${id}`);
    return data;
  },

  async addQuantity(id: number, quantity: number) {
    const { data } = await api.patch<SingleStockResponse>(`/stocks/${id}/add-quantity`, { quantity });
    return data;
  },

  async getLowStock(threshold: number = 10) {
    const { data } = await api.get<{ success: boolean; data: Stock[]; count: number }>(
      `/stocks/low-stock?threshold=${threshold}`
    );
    return data;
  },

  async getCategories() {
    const { data } = await api.get<{ success: boolean; data: CategoryStats[] }>("/stocks/categories");
    return data;
  },

  async getTotalValue() {
    const { data } = await api.get<TotalValueResponse>("/stocks/total-value");
    return data;
  }
};