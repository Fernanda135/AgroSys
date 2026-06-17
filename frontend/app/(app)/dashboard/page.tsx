"use client";

import ProtectedRoute from "../../components/ProtectedRoute";


export default function Dashboard() {

  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
