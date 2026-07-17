"use client";

import { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useProfile } from "@/app/hooks/useProfile";
import { profileService } from "@/app/services/profile.service";

export default function ProfilePage() {
  const { profile, loading, reload } = useProfile();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
      });
    }
  }, [profile]);

  const getInitial = (name?: string) => {
    return name?.charAt(0).toUpperCase() ?? "?";
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      await profileService.updateProfile(form);

      await reload();

      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar o perfil.");
    }
  }

  function handleCancel() {
    if (profile) {
      setForm({
        name: profile.name,
        email: profile.email,
      });
    }

    setEditing(false);
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-5">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
                <p className="text-sm text-gray-500">
                  Carregando perfil...
                </p>
              </div>
            </div>
          ) : !profile ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-gray-500">
                Não foi possível carregar o perfil.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-(--green-50) px-8 py-8">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-green-100 shadow-lg">
                    <span className="text-4xl font-bold text-(--green-500)">
                      {getInitial(profile.name)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profile.name}
                    </h2>

                    <div className="mt-1 flex flex-col gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
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

              <div className="p-8">
                <div className="mb-6 flex justify-end gap-3">
                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="rounded-sm bg-(--green-500) px-3 py-2 text-white transition-colors hover:bg-green-700 cursor-pointer"
                    >
                      Editar Perfil
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="rounded-sm bg-(--green-500) px-3 py-2 text-white transition-colors hover:bg-green-700 cursor-pointer"
                      >
                        Salvar
                      </button>

                      <button
                        onClick={handleCancel}
                        className="rounded-sm border border-gray-300 bg-white px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="group rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-all hover:border-green-200 hover:bg-green-50/30">
                    <div className="mb-2 flex items-center gap-2.5">
                      <div className="rounded-lg bg-green-100 p-2 text-green-600">
                        <User size={18} />
                      </div>

                      <span className="text-sm font-medium text-gray-500">
                        Nome Completo
                      </span>
                    </div>

                    {editing ? (
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition-colors focus:border-(--green-500)"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900">
                        {profile.name}
                      </p>
                    )}
                  </div>

                  <div className="group rounded-xl border border-gray-200 bg-gray-50/50 p-5 transition-all hover:border-green-200 hover:bg-green-50/30">
                    <div className="mb-2 flex items-center gap-2.5">
                      <div className="rounded-lg bg-green-100 p-2 text-green-600">
                        <Mail size={18} />
                      </div>

                      <span className="text-sm font-medium text-gray-500">
                        E-mail
                      </span>
                    </div>

                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition-colors focus:border-(--green-500)"
                      />
                    ) : (
                      <p className="text-base font-semibold text-gray-900">
                        {profile.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}