import React, { useEffect, useState } from "react";
import LoginBackground from "/assets/login-background.jpg";
import Logo from "/assets/logo.png";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    //Continuar o envio do login!
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
            <div className="col-10 col-sm-10 col-md-8 col-lg-6">
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
