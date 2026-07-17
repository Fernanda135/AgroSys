'use client';

import { useState, useEffect } from 'react';

import { profileService } from "@/app/services/profile.service";
import Logo from '../Logo';

interface User {
    id: number;
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

            const response = await profileService.getProfile();

            if (response.success) {
                setUser(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className='flex items-center justify-between w-full px-8 py-4 bg-white border-b-2 border-(--gray)'>
            <div className="flex items-center justify-center gap-2">
                <Logo
                    size={70}
                />

                <div>
                    <div className="flex" >
                        <h1 className="text-(--black) font-bold text-3xl underline decoration-(--gray-2)" >Agro</h1>
                        <h1 className="text-(--green-500) font-bold text-3xl underline decoration-(--gray-2)" >Sys</h1>
                    </div>
                    <p className="text-(--black) text-[8.5px]" >SISTEMA DE GESTÃO AGRÍCOLA</p>
                </div>

            </div>

            <div className='flex items-center gap-3'>
                <div className='flex flex-col items-end leading-tight'>
                    <span className='text-xs text-(--gray-2) font-medium'>
                        Bem Vindo,
                    </span>
                    <span className='text-sm font-semibold text-(--black)'>
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