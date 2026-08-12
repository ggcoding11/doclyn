import React, { useState } from "react";
import axios from "axios";

import LoginBackground from "/assets/login-background.jpg";
import Logo from "/assets/logo.png";

import "../css/Login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 overflow-hidden">
        <div className="d-none d-sm-block col-5 p-0">
          <img
            src={LoginBackground}
            className="object-fit-cover w-100 h-100"
            alt="login-background"
          />
        </div>
        <div className="col-12 col-sm-7 bg-light-subtle">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="col-10 col-sm-10 col-md-8 col-lg-6 d-flex flex-column gap-2">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <img src={Logo} className="img-fluid" alt="logo" />
                </div>

                <div className="mb-3">
                  <label className="form-label w-100">
                    <span className="fw-semibold">Login</span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Digite o seu login"
                      onChange={(e) => setLogin(e.target.value)}
                      value={login}
                      required
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label w-100">
                    <span className="fw-semibold">Senha</span>
                    <input
                      type="password"
                      className="form-control mt-2"
                      placeholder="Digite a sua senha"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Acessar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
