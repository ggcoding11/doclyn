import React from "react";
import Logo from "/assets/logo.png";
import { FaUser } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Home = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <div className="bg-base-200 h-screen w-full">
          <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
              <label
                htmlFor="sidebar"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>{" "}
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost text-xl">Dashboard - Doclyn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu flex flex-col gap-4 bg-zinc-300 min-h-full w-70 p-4">
          <header className="flex justify-center">
            <img src={Logo} alt="logo" className="w-50" />
          </header>
          <ul className="flex flex-col gap-2 text-xl">
            <li>
              <div className="flex items-center gap-4">
                <FaHome />
                <a>Início</a>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <FaUser />
                <a>Funcionários</a>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-4">
                <FaFile />
                <a>Gerar Documentos</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
