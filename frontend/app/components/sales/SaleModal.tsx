"use client";

import { useEffect, useState } from "react";
import { Wallet, X, Plus, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";

import { CreateSaleData, Sale } from "@/app/services/sale.service";
import { getToday, formatDateInput } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/currency";
import { stockService, Stock } from "@/app/services/stock.service";

interface SaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateSaleData) => Promise<void>;
  initialData?: Sale;
  mode: "add" | "edit";
}

interface SaleItem {
  stock_id: number;
  product_name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  max_quantity: number;
}

const PAYMENT_METHODS = [
  "DINHEIRO",
  "PIX",
  "CARTAO_DEBITO",
  "CARTAO_CREDITO",
  "TRANSFERENCIA",
];

const STATUS_OPTIONS = [
  "PENDENTE",
  "PAGO",
  "CANCELADO",
] as const;

export default function SaleModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}: SaleModalProps) {
  const today = getToday();

  const [formData, setFormData] = useState<CreateSaleData>({
    client_name: "",
    sale_date: today,
    payment_method: "PIX",
    status: "PAGO",
    notes: "",
    items: [],
  });

  const [errors, setErrors] = useState<{
    client_name?: string;
    sale_date?: string;
    items?: string;
  }>({});

  const [stockItems, setStockItems] = useState<Stock[]>([]);
  const [loadingStock, setLoadingStock] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStockDropdown, setShowStockDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SaleItem[]>([]);
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);


  useEffect(() => {
    if (isOpen) {
      loadStockItems();
    }
  }, [isOpen]);

  const loadStockItems = async () => {
    try {
      setLoadingStock(true);
      const response = await stockService.getAll();
      if (response.success) {
        const availableItems = response.data.filter(item => item.quantity > 0);
        setStockItems(availableItems);
      }
    } catch (error) {
      console.error("Erro ao carregar estoque:", error);
      toast.error("Erro ao carregar itens do estoque");
    } finally {
      setLoadingStock(false);
    }
  };

  useEffect(() => {
    if (initialData && mode === "edit") {

      const items: SaleItem[] = initialData.items.map(item => {

        const stockProduct = stockItems.find(
          stock => stock.id === item.stock_id
        );

        return {
          stock_id: item.stock_id,
          product_name: item.stock?.product_name || "Produto",
          quantity: Number(item.quantity),
          unit: item.unit,
          unit_price: Number(item.unit_price),
          total_price: Number(item.total_price),
          max_quantity: stockProduct?.quantity ?? 9999,
        };

      });

      setSelectedItems(items);
      setTotalSaleAmount(
        items.reduce(
          (sum, item) => sum + item.total_price,
          0
        )
      );

      setFormData({
        client_name: initialData.client_name,
        sale_date: formatDateInput(initialData.sale_date),
        payment_method: initialData.payment_method,
        status: initialData.status,
        notes: initialData.notes ?? "",
        items: initialData.items.map(item => ({
          stock_id: item.stock_id,
          quantity: Number(item.quantity),
          unit: item.unit,
          unit_price: Number(item.unit_price),
          total_price: Number(item.total_price),
        })),
      });
    } else {
      setSelectedItems([]);
      setTotalSaleAmount(0);

      setFormData({
        client_name: "",
        sale_date: today,
        payment_method: "PIX",
        status: "PAGO",
        notes: "",
        items: [],
      });
    }

    setErrors({});
  }, [initialData, isOpen, today, mode, stockItems]);

  if (!isOpen) return null;

  const filteredStockItems = stockItems.filter(item =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleAddItem = (stock: Stock) => {
    const existingItem = selectedItems.find(
      item => item.stock_id === stock.id
    );

    if (existingItem) {
      toast.warning("Este produto já foi adicionado");
      return;
    }

    const newItem: SaleItem = {
      stock_id: stock.id,
      product_name: stock.product_name,
      quantity: 1,
      unit: stock.unit,
      unit_price: Number(stock.unit_price),
      total_price: Number(stock.unit_price),
      max_quantity: stock.quantity,
    };


    const updatedItems = [...selectedItems, newItem];

    setSelectedItems(updatedItems);
    updateTotalAmount(updatedItems);

    setShowStockDropdown(false);
    setSearchTerm("");
  };


  const updateItemQuantity = (index: number, quantity: number) => {
    const updatedItems = [...selectedItems];
    const item = updatedItems[index];

    if (quantity <= 0) {
      toast.warning("A quantidade deve ser maior que zero");
      return;
    }

    if (quantity > item.max_quantity) {
      toast.warning(`Quantidade disponível: ${item.max_quantity} ${item.unit}`);
      return;
    }

    item.quantity = quantity;
    item.total_price = quantity * item.unit_price;
    updatedItems[index] = item;

    setSelectedItems(updatedItems);
    updateTotalAmount(updatedItems);
  };

  const updateItemPrice = (index: number, price: number) => {
    const updatedItems = [...selectedItems];
    const item = updatedItems[index];

    if (price < 0) {
      toast.warning("O preço não pode ser negativo");
      return;
    }

    item.unit_price = price;
    item.total_price = item.quantity * price;
    updatedItems[index] = item;

    setSelectedItems(updatedItems);
    updateTotalAmount(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
    updateTotalAmount(updatedItems);
  };

  const updateTotalAmount = (items: SaleItem[]) => {
    const total = items.reduce((sum, item) => sum + item.total_price, 0);
    setTotalSaleAmount(total);
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!formData.client_name.trim()) newErrors.client_name = "Informe o cliente";
    if (selectedItems.length === 0) newErrors.items = "Adicione pelo menos um produto";
    if (!formData.sale_date) newErrors.sale_date = "Informe a data";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.warning("Preencha os campos obrigatórios.");
      return false;
    }

    return true;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    try {
      const saleData: CreateSaleData = {
        client_name: formData.client_name,
        sale_date: formData.sale_date,
        payment_method: formData.payment_method,
        status: formData.status,
        notes: formData.notes,

        items: selectedItems.map(item => ({
          stock_id: item.stock_id,
          quantity: item.quantity,
          unit: item.unit,
          unit_price: item.unit_price,
          total_price: item.total_price,
        })),
      };

      await onSave(saleData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-(--green-50) p-2">
              <Wallet className="text-(--green-500)" size={24} />
            </div>
            <h2 className="text-xl font-bold text-(--black)">
              {mode === "add" ? "Nova Venda" : "Editar Venda"}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-(--black)">
              Cliente *
            </label>
            <input
              type="text"
              value={formData.client_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  client_name: e.target.value,
                })
              }
              className={`mt-1 w-full rounded-lg border ${errors.client_name ? "border-(--danger)" : "border-gray-300"
                } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
              placeholder="Nome do cliente"
            />
            {errors.client_name && (
              <p className="text-sm text-red-500 mt-1">{errors.client_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-(--black)">
              Adicionar Produto *
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowStockDropdown(true);
                }}
                onFocus={() => setShowStockDropdown(true)}
                className={`mt-1 w-full rounded-lg border ${errors.items ? "border-(--danger)" : "border-gray-300"
                  } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
                disabled={loadingStock}
              />

              {showStockDropdown && searchTerm.length >= 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {loadingStock ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      Carregando produtos...
                    </div>
                  ) : filteredStockItems.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto disponível"}
                    </div>
                  ) : (
                    filteredStockItems.map((stock) => (
                      <button
                        key={stock.id}
                        type="button"
                        onClick={() => handleAddItem(stock)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0 flex justify-between items-center"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {stock.product_name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {stock.category || "Sem categoria"} • {stock.quantity} {stock.unit} disponível
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-(--green-500)">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(Number(stock.unit_price))}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            {errors.items && (
              <p className="text-sm text-red-500 mt-1">{errors.items}</p>
            )}
          </div>

          {selectedItems.length > 0 && (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h4 className="text-sm font-semibold text-gray-700">Produtos selecionados</h4>
              </div>
              <div className="divide-y">
                {selectedItems.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Disponível: {item.max_quantity} {item.unit}
                        </p>
                        <p className="text-xs text-gray-500">
                          Preço: R$ {item.unit_price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div>
                        <label className="text-xs text-gray-500">Quantidade</label>
                        <input
                          type="number"
                          min="1"
                          max={item.max_quantity}
                          value={item.quantity}
                          onChange={(e) => updateItemQuantity(index, Number(e.target.value))}
                          className="w-full rounded-lg border px-2 py-1 text-sm focus:outline-none focus:border-(--green-500)"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Preço Unit.</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unit_price}
                          onChange={(e) => updateItemPrice(index, Number(e.target.value))}
                          className="w-full rounded-lg border px-2 py-1 text-sm focus:outline-none focus:border-(--green-500)"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Total</label>
                        <p className="text-sm font-semibold text-(--green-500) mt-1">
                          {formatCurrency(item.total_price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalSaleAmount > 0 && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-800">Total da Venda</span>
                <span className="text-xl font-bold text-green-900">
                  {formatCurrency(totalSaleAmount)}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-(--black)">
              Data da Venda *
            </label>
            <input
              type="date"
              value={formData.sale_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sale_date: e.target.value,
                })
              }
              className={`mt-1 w-full rounded-lg border ${errors.sale_date ? "border-(--danger)" : "border-gray-300"
                } px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)`}
            />
            {errors.sale_date && (
              <p className="text-sm text-red-500 mt-1">{errors.sale_date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-(--black)">
              Forma de Pagamento
            </label>
            <select
              value={formData.payment_method}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_method: e.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method.charAt(0) + method.slice(1).toLowerCase().replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-(--black)">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as CreateSaleData["status"],
                })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-(--black)">
              Observações
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-colors focus:border-(--green-500) focus:outline-none focus:ring-2 focus:ring-(--green-50)"
              placeholder="Observações adicionais..."
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:border-gray-400 sm:flex-none sm:px-6 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-(--green-500) px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 sm:flex-none sm:px-6 cursor-pointer"
            >
              {mode === "add" ? "Cadastrar Venda" : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}