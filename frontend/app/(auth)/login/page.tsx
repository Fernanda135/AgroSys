"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { authService } from "@/app/services/auth.service";
import Logo from "@/app/components/Logo";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    toast.info("Validando dados...");

    try {
      const data = await authService.login({
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Email ou senha inválidos!";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl px-10 py-8 text-center">

        <div className="flex items-center justify-center gap-2 mb-5">
          <Logo
          size={100}
          />
          <div>
            <div className="flex" >
              <h1 className="text-(--black) font-bold text-4xl underline decoration-(--gray-2)" >Agro</h1>
              <h1 className="text-(--green-500) font-bold text-4xl underline decoration-(--gray-2)" >Sys</h1>
            </div>
            <p className="text-(--black) text-[10px]" >SISTEMA DE GESTÃO AGRÍCOLA</p>
          </div>
        </div>

        <h1 className="text-[36px] font-bold text-gray-900 mb-2">
          Bem-vindo de volta!
        </h1>

        <p className="text-base text-gray-600 mb-10">
          Faça login para acessar sua conta
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-800">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="Digite seu e-mail"
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-gray-900 placeholder-gray-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-800">
              Senha
            </label>

            <input
              id="password"
              type="password"
              required
              placeholder="Digite sua senha"
              className="w-full h-12 px-4 rounded-xl bg-gray-50 border border-gray-300 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-gray-900 placeholder-gray-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-4 h-12 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl transition duration-200 shadow-md hover:shadow-lg"
          >
            Entrar
          </button>
        </form>

        <p className="mt-5 text-sm text-gray-700">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="text-green-600 font-semibold hover:text-green-700 hover:underline transition"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}