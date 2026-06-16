'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from "../../services/api";

interface User {
    id: string;
    name: string;
    email: string;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

    const getInitial = (name: string) => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    async function fetchProfile() {
        try {
            const token = localStorage.getItem("accessToken");
            
            if (!token) {
                console.warn("Token não encontrado");
                return;
            }

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
        <div className='flex items-center justify-between w-full px-8 py-4 bg-white border-b-2 border-b-(--gray)'>
            <Image
                src="/RS-logo.png"
                alt="AgroSys"
                width={120}
                height={48}
                className="object-contain"
                priority
            />

            <div className='flex items-center gap-3'>
                <div className='flex flex-col items-end leading-tight'>
                    <span className='text-xs text-gray-500 font-medium'>
                        Bem Vindo,
                    </span>
                    <span className='text-sm font-semibold text-gray-800'>
                        {user ? user.name : "Carregando..."}
                    </span>
                </div>
                
                <div className='w-10 h-10 rounded-full bg-(--green-500) flex items-center justify-center text-white font-semibold text-sm hover:scale-105 transition-transform duration-200'>
                    {user ? getInitial(user.name) : '?'}
                </div>
            </div>
        </div>
    );
}