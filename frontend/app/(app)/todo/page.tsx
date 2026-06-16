"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function ToDo() {
  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-3xl font-bold">Minhas Tarefas</h1>

        <p className="mt-4">Aqui serão exibidas as tarefas do agricultor.</p>
      </main>
    </ProtectedRoute>
  );
}
