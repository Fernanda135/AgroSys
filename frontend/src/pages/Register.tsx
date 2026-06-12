import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/RS-logo.png";
import "../styles/global.css";
import { useState } from "react";
import api from "../services/api.ts";
import { toast } from "react-toastify";



export default function Register() {

    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/sign-up",
                {
                    name,
                    email,
                    password
                }
            );

            toast.success("Cadastro realizado com sucesso!");
            navigate("/dashboard");
            // console.log(response.data);
        } catch (error) {
            toast.error("Email ou senha inválidos!");
            console.error(error);
        }
    }

    return (
        <div className="login-container flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-lg px-10 py-8 text-center">

                <img
                    src={logo}
                    alt="RuralSys"
                    className="w-52 mx-auto mb-8"
                />

                <h1 className="text-[36px] font-bold text-(--black) mb-2">
                    Crie sua conta
                </h1>

                <p className="text-base text-(--black) mb-10">
                    Preencha os dados para se cadastrar
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                    <div className="text-left">
                        <label
                            htmlFor="name"
                            className="block mb-2 font-semibold text-(--black)"
                        >
                            Nome
                        </label>

                        <input
                            type="text"
                            id="name"
                            required
                            placeholder="Digite seu nome"
                            className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label
                            htmlFor="email"
                            className="block mb-2 font-semibold text-(--black)"
                        >
                            E-mail
                        </label>

                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Digite seu e-mail"
                            className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label
                            htmlFor="password"
                            className="block mb-2 font-semibold text-(--black)"
                        >
                            Senha
                        </label>

                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Digite sua senha"
                            className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-left">
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 font-semibold text-(--black)"
                        >
                            Confirmar senha
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirme sua senha"
                            className="w-full h-12 px-4 rounded-xl bg-gray-100 border border-gray-200 outline-none focus:border-(--green-500)"
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
                    Já tem uma conta?{" "}
                    <Link
                        to="/"
                        className="text-green-500 font-medium hover:underline"
                    >
                        Faça login
                    </Link>
                </p>

            </div>
        </div>
    );
}