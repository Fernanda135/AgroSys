"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "../components/ProtectedRoute";
import api from "../services/api";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);

    async function fetchProfile() {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await api.get("/profile", {
                headers: {
                    Authorization: token,
                },
            });

            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProtectedRoute>
            <main className="p-10">
                <h1 className="text-3xl font-bold mb-4">
                    Dashboard
                </h1>

                <p className="text-lg">
                    Olá,{" "}
                    <strong>
                        {user ? user.name : "Carregando..."}
                    </strong>
                </p>
            </main>
        </ProtectedRoute>
    );
}