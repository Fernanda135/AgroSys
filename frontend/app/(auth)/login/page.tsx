"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { authService } from "@/app/services/auth.service";

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
    } catch (error) {
      console.error(error);
      toast.error("Email ou senha inválidos!");
    }
  }

  return (
    <div className="login-container flex items-center justify-center min-h-screen">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg px-10 py-8 text-center">
        <Image
          src="/RS-logo.png"
          alt="RuralSys"
          width={200}
          height={80}
          className="mx-auto"
        />

        <h1 className="text-[36px] font-bold text-(--black) mb-2">
          Bem-vindo de volta!
        </h1>

        <p className="text-base text-(--black) mb-10">
          Faça login para acessar sua conta
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="email" className="block mb-2 font-semibold">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="Digite seu e-mail"
              className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Senha
            </label>

            <input
              id="password"
              type="password"
              required
              placeholder="Digite sua senha"
              className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer mt-4 h-12 bg-(--green-500) hover:bg-green-700 text-white font-semibold rounded-xl transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-5 text-sm text-(--black)">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="text-(--green-500) font-medium hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
