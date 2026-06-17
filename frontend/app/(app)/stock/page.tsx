import React from 'react'

import ProtectedRoute from '@/app/components/ProtectedRoute'

export default function page() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-4">Estoque</h1>
      </div>
    </ProtectedRoute>
  )
}
