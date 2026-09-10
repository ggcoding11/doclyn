import React from "react";

import Logo from "/assets/logo.png";

import { FaUser, FaFile, FaHome } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ children, activeMenu }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "Home",
      icon: <FaHome />,
      routeName: "home",
    },
    {
      id: 2,
      title: "Funcionários",
      icon: <FaUser />,
      routeName: "funcionarios",
    },
    {
      id: 3,
      title: "Documentos",
      icon: <FaFile />,
      routeName: "documentos",
    },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Conteúdo da página */}
        <div className="bg-base-200 min-h-screen w-full">
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
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu flex flex-col bg-white dark:bg-gray-800 gap-4 min-h-full w-70 p-4">
          <header className="flex justify-center">
            <img src={Logo} alt="logo" className="w-50" />
          </header>
          <ul className="flex flex-col gap-2 text-xl">
            {menuItems.map((menu) => (
              <li
                key={menu.id}
                className={`rounded-lg ${activeMenu === menu.routeName && "bg-zinc-300 dark:bg-zinc-500"}`}
                onClick={() => navigate("/" + menu.routeName)}
              >
                <div className="flex items-center gap-4">
                  {menu.icon}
                  <a>{menu.title}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
