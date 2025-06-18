import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";

const Login = () => {
  const { user, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirec, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const { data: userDoc } = await axios.post("/users/login", {
          email,
          password,
        });

        setUser(userDoc);
        setRedirect(true);
      } catch (error) {
        alert(`Usuário ou senha inválidos. ${error.response.data}`);
      }
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  if (redirec || user) return <Navigate to="/" />;

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-8">
        <h1 className="text-3xl font-bold">Faça seu login</h1>

        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white"
            onSubmit={handleSubmit}
          >
            Login
          </button>
        </form>

        <p>
          Ainda não tem uma conta?{" "}
          <Link className="font-semibold underline" to="/register">
            Resgistr-se aqui!
          </Link>
          {""}
        </p>
      </div>
    </section>
  );
};

export default Login;
