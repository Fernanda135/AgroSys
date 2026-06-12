import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";
import logo from "../assets/RS-logo.png";
import { useState } from "react";
import api from "../services/api.ts";
import { toast } from "react-toastify";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.info("Validando dados");
        try {
            const response = await api.post(
                "/sign-in",
                {
                    email,
                    password
                }
            );

            
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            
            toast.success("Login realizado com sucesso!");
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
                <img src={logo} alt="RuralSys" className="w-52 mx-auto mb-8" />

                <h1 className="text-[36px] font-bold text-(--black) mb-2">
                    Bem-vindo de volta!
                </h1>

                <p className="text-base text (--black) mb-10">
                    Faça login para acessar sua conta
                </p>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

                    <button
                        type="submit"
                        className="cursor-pointer mt-4 h-12 bg-(--green-500) hover:bg-green-700 text-white font-semibold rounded-xl transition"
                    >
                        Entar
                    </button>
                </form>

                <p className="mt-5 text-sm text (--black)">
                    Não tem conta?{" "}
                    <Link
                        to="/register"
                        className="text-green-500 font-medium hover:underline"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
}
