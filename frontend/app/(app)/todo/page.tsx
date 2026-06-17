"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function ToDo() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Tarefas</h1>
      </div>
    </ProtectedRoute>
  );
}
