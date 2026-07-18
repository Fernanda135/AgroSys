"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { authService } from "@/app/services/auth.service";
import Logo from "@/app/components/Logo";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    toast.info("Validando dados...");

    try {
      const data = await authService.register({
        name,
        email,
        password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Cadastro realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar cadastro!");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 p-4">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-12 md:gap-20">

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-6">
            <Logo size={120} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-(--black) mb-4">
            Gestão Rural Simplificada
          </h2>

          <p className="text-lg text-(--gray-2) max-w-md">
            Desenvolvido para ajudar pequenos agricultores a controlar a produção e tomar melhores decisões.
          </p>

          <div className="hidden md:flex mt-8 gap-3">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl px-10 py-8 border border-white/20 text-center">

            <h1 className="text-[36px] font-bold text-(--black) mb-2">
              Crie sua conta
            </h1>

            <p className="text-base text-(--gray-2) mb-10">
              Preencha os dados para se cadastrar
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="text-left">
                <label htmlFor="name" className="block mb-2 font-semibold text-(--black)">
                  Nome
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Digite seu nome"
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 outline-none focus:border-(--green-500) focus:ring-4 focus:ring-(--green-50) transition-all duration-300 text-(--black) placeholder-(--gray-2)"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="text-left">
                <label htmlFor="email" className="block mb-2 font-semibold text-(--black)">
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Digite seu e-mail"
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 outline-none focus:border-(--green-500) focus:ring-4 focus:ring-(--green-50) transition-all duration-300 text-(--black) placeholder-(--gray-2)"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="text-left">
                <label htmlFor="password" className="block mb-2 font-semibold text-(--black)">
                  Senha
                </label>

                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Digite sua senha"
                  className="w-full h-12 px-4 rounded-xl bg-gray-50 border-2 border-gray-200 outline-none focus:border-(--green-500) focus:ring-4 focus:ring-(--green-50) transition-all duration-300 text-(--black) placeholder-(--gray-2)"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer mt-4 h-12 bg-(--green-500) hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl transition duration-200 shadow-md hover:shadow-lg"
              >
                Cadastrar
              </button>
            </form>

            <p className="mt-5 text-sm text-(--gray-2)">
              Já possui conta?{" "}
              <Link
                href="/login"
                className="text-(--green-500) font-semibold hover:text-green-700 hover:underline transition"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}