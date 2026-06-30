import api from "./api";

export interface Stock {
  id: number;
  user_id: number;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  unit: string;
}

export const stockService = {
  async getAll() {
    const { data } = await api.get<Stock[]>("/stocks");
    return data;
  },

  async create(stock: {
    product_name: string;
    category: string;
    quantity: number;
    unit_price: number;
    unit: string;
  }) {
    const { data } = await api.post("/stocks", stock);
    return data;
  },

  async update(
    id: number,
    stock: Partial<{
      product_name: string;
      category: string;
      quantity: number;
      unit_price: number;
      unit: string;
    }>
  ) {
    const { data } = await api.put(`/stocks/${id}`, stock);
    return data;
  },

  async delete(id: number) {
    const { data } = await api.delete<{ message: string }>(`/stocks/${id}`);
    return data;
  },
};