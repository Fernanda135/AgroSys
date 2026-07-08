"use client";

import { User, Mail, SquarePen, Calendar, Building2, MapPin, Phone } from "lucide-react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useProfile } from "@/app/hooks/useProfile";

export default function ProfilePage() {
  const { profile, loading } = useProfile();

  const getInitial = (name: string) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
                  <p className="text-sm text-gray-500">Carregando perfil...</p>
                </div>
              </div>
            ) : (
              profile && (
                <>
                  {/* Profile Header */}
                  <div className="bg-(--green-50) to-emerald-50 px-8 py-8">
                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                      <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-green-100 shadow-lg">
                          <div className='text-(--green-500) font-bold text-4xl'>
                    {profile ? getInitial(profile.name) : '?'}
                </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {profile.name}
                        </h2>
                        <div className="mt-1 flex flex-col flex-wrap  gap-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail size={16} />
                            {profile.email}
                          </span>
                          <span className="text-xs text-gray-400">
                            ID: {profile.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details Grid */}
                  <div className="p-8">
                    <button className="bg-(--green-500) text-white py-1 px-2.5 rounded-sm cursor-pointer hover:bg-green-700 mb-4" >Editar perfil</button>
                    <div className="grid gap-6 sm:grid-cols-2">

                      
                      {/* Name */}
                      <div className="group rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-all hover:border-green-200 hover:bg-green-50/30">
                        <div className="mb-2 flex items-center gap-2.5">
                          <div className="rounded-lg bg-green-100 p-2 text-green-600">
                            <User size={18} />
                          </div>
                          <span className="text-sm font-medium text-gray-500">
                            Nome Completo
                          </span>
                        </div>
                        <p className="text-base font-semibold text-gray-900">
                          {profile.name}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="group rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-all hover:border-green-200 hover:bg-green-50/30">
                        <div className="mb-2 flex items-center gap-2.5">
                          <div className="rounded-lg bg-green-100 p-2 text-green-600">
                            <Mail size={18} />
                          </div>
                          <span className="text-sm font-medium text-gray-500">
                            E-mail
                          </span>
                        </div>
                        <p className="text-base font-semibold text-gray-900">
                          {profile.email}
                        </p>
                      </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
                      <button className="bg-(--green-500) text-white py-1 px-2.5 rounded-sm cursor-pointer hover:bg-green-700">
                        Salvar Alterações
                      </button>
                      <button className="py-1 px-2.5 rounded-sm cursor-pointer border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400">
                        Cancelar
                      </button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>

          
        </div>
    </ProtectedRoute>
  );
}