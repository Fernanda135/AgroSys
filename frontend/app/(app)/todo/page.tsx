"use client";

import { useState } from "react";
import { ClipboardList, Clock, CircleCheckBig } from "lucide-react";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useTodos } from "@/app/hooks/useTodos";
import { Todo } from "@/app/services/todo.service";
import SummaryCard from "@/app/components/SummaryCard";
import TodoModal from "@/app/components/todo/TodoModal";
import TodoTable from "@/app/components/todo/TodoTable";
import { toast } from "react-toastify";

export default function ToDo() {
  const {
    todos,
    totalCount,
    pendingCount,
    completedCount,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);


  const handleAddTodo = () => {
    setModalMode("add");
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setModalMode("edit");
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveTodo = (data: { title: string; description: string }) => {
    if (modalMode === "add") {
      addTodo(data);
      toast.success(`Tarefa "${data.title}" criada com sucesso!`);
    } else if (editingTodo) {
      updateTodo(editingTodo.id, data);
      toast.success(`Tarefa "${data.title}" atualizada com sucesso!`);
    }
  };

  const handleCompleteClick = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo && !todo.completed) {
      const confirmMessage = `Tem certeza que deseja marcar "${todo.title}" como concluída?`;
      if (confirm(confirmMessage)) {
        toggleTodo(id);
        toast.success(`Tarefa "${todo.title}" concluída com sucesso!`);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const confirmMessage = `Tem certeza que deseja excluir "${todo.title}"? Esta ação não pode ser desfeita.`;
      if (confirm(confirmMessage)) {
        deleteTodo(id);
        toast.success(`Tarefa "${todo.title}" excluída com sucesso!`);
      }
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white p-6 md:p-10 rounded-xl">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-(--black)">Tarefas</h1>
              <p className="mt-1 text-sm text-(--gray-2)">
                Gerencie suas tarefas do dia a dia
              </p>
            </div>
            <button
              onClick={handleAddTodo}
              className="flex items-center gap-2 rounded-lg bg-(--green-500) px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-green-700 cursor-pointer"
            >
              <ClipboardList size={18} />
              Adicionar Tarefa
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            <SummaryCard
              value={totalCount}
              title="Total de tarefas"
              icon={<ClipboardList className="text-(--green-500)" size={52} />}
            />
            <SummaryCard
              value={pendingCount}
              title="Tarefas pendentes"
              icon={<Clock className="text-(--warning)" size={52} />}
            />
            <SummaryCard
              value={completedCount}
              title="Tarefas concluídas"
              icon={<CircleCheckBig className="text-(--green-500)" size={52} />}
            />
          </div>

          <TodoTable
            todos={todos}
            onComplete={handleCompleteClick}
            onEdit={handleEditTodo}
            onDelete={handleDeleteClick}
          />

          <TodoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTodo}
            initialData={editingTodo || undefined}
            mode={modalMode}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}