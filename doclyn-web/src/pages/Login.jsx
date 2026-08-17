import React from "react";
import Logo from "/assets/logo.png";
import BackgroundImage from "/assets/background_login_page.jpg";

const Login = () => {
  return (
    <div id="container" className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:block">
        <img src={BackgroundImage} alt="background-image" />
      </div>

      <form className="flex flex-col justify-center items-center gap-2">
        <img src={Logo} className="w-84 h-60" alt="logo-principal" />

        <div className="flex flex-col gap-4 w-60 sm:w-80 lg:w-100">
          <fieldset className="fieldset">
            <label className="label" htmlFor="name">
              Nome do usuário:
            </label>
            <input
              type="text"
              id="name"
              className="input w-full"
              placeholder="Digite o nome do usuário..."
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
              placeholder="Digite a senha do usuário..."
            />
          </fieldset>

          <button className="btn w-full">Fazer login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
