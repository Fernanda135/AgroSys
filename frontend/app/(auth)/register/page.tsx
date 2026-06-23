"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    toast.info("Validando dados...");

    try {
      await api.post("/sign-up", {
        name,
        email,
        password,
      });

      toast.success("Cadastro realizado com sucesso!");
      router.push("/dashboard");
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
          alt="RuralSys"
          width={200}
          height={80}
          className="mx-auto"
        />

        <h1 className="text-[36px] font-bold text-(--black) mb-2">
          Crie sua conta
        </h1>

        <p className="text-base text-(--black) mb-10">
          Preencha os dados para se cadastrar
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Nome
            </label>

            <input
              id="name"
              type="text"
              required
              placeholder="Digite seu nome"
              className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            Cadastrar
          </button>
        </form>

        <p className="mt-5 text-sm text-(--black)">
          Já possui conta?{" "}
          <Link
            href="/login"
            className="text-(--green-500) font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
