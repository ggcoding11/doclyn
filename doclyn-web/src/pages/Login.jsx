import React, { useContext, useEffect, useState } from "react";
import Logo from "/assets/logo.png";
import BackgroundImage from "/assets/background_login_page.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const request = { login, password };

    try {
      const response = await axios.post(apiUrl + "/auth/login", request);

      localStorage.setItem("token", response.data.token);

      setIsAuthenticated(true);

      navigate("/home");
    } catch (error) {
      openModalLoginFail();
    }
  };

  const openModalLoginFail = () => {
    document.getElementById("modal-login-fail").showModal()
  };

  return (
    <div id="container" className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:block overflow-hidden">
        <img
          src={BackgroundImage}
          className="w-full h-full"
          alt="background-image"
        />
      </div>

      <form
        className="flex flex-col justify-center items-center gap-2"
        onSubmit={handleLogin}
      >
        <img src={Logo} className="w-84 h-60" alt="logo-principal" />

        <div className="flex flex-col gap-4 w-60 sm:w-80 lg:w-100">
          <fieldset className="fieldset">
            <label className="label" htmlFor="login">
              Login:
            </label>
            <input
              type="text"
              id="login"
              className="input w-full"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Digite o seu login..."
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label" htmlFor="password">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha do usuário..."
              required
            />
          </fieldset>

          <button type="submit" className="btn btn-soft w-full">
            Fazer login
          </button>

          <dialog id="modal-login-fail" className="modal">
            <div className="modal-box bg-red-400">
              <h3 className="font-bold text-lg">Erro de autenticação</h3>
              <p className="py-4 text-xl">
                Login ou senha incorretos!
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Fechar</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </form>
    </div>
  );
};

export default Login;
