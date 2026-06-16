"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await api.post("/sign-up", {
                name,
                email,
                password,
            });

            toast.success("Cadastro realizado com sucesso!");

            router.push("/login");

        } catch (error) {
            console.error(error);
            toast.error("Erro ao realizar cadastro!");
        }
    }

    return (
        <div className="login-container flex items-center justify-center min-h-screen">

            <div className="bg-white w-full max-w-md rounded-3xl shadow-lg px-10 py-8 text-center">

                <Image
                    src="/RS-logo.png"
                    alt="AgroSys"
                    width={200}
                    height={80}
                    className="mx-auto mb-8"
                />

                <h1 className="text-3xl font-bold mb-2">
                    Crie sua conta
                </h1>

                <p className="mb-10">
                    Preencha os dados para se cadastrar
                </p>

                <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Nome"
                        required
                        className="h-12 px-4 rounded-xl bg-gray-100"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        required
                        className="h-12 px-4 rounded-xl bg-gray-100"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        required
                        className="h-12 px-4 rounded-xl bg-gray-100"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="h-12 bg-green-600 text-white rounded-xl"
                    >
                        Cadastrar
                    </button>

                </form>

                <p className="mt-5">
                    Já possui conta?{" "}
                    <Link
                        href="/login"
                        className="text-green-600 hover:underline"
                    >
                        Entrar
                    </Link>
                </p>

            </div>

        </div>
    );
}