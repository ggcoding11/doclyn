import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaPencilAlt, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Funcionarios = () => {
  const navigate = useNavigate();

  const [funcionarios, setFuncionarios] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/funcionarios");

      setFuncionarios(response.data);
    };

    fetchData();
  }, []);

  return (
    <Sidebar activeMenu={"funcionarios"}>
      <div className="min-h-screen px-4 py-2 gap-2" id="main">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Funcionários</h1>

            <h3>Gerencie todos os funcionários da empresa</h3>
          </div>

          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Cargo</th>
                  <th>CPF</th>
                  <th>Data de Admissão</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios &&
                  funcionarios.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <th>{funcionario.id}</th>
                      <td>{funcionario.nome}</td>
                      <td>{funcionario.cargo}</td>
                      <td>{funcionario.cpf}</td>
                      <td>{funcionario.dataAdmissao}</td>
                      <td>{funcionario.status}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              navigate(`/funcionarios/editar/${funcionario.id}`)
                            }
                          >
                            <FaPencilAlt />
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={() =>
                              navigate(`/funcionarios/${funcionario.id}`)
                            }
                          >
                            <FaRegEye />
                          </button>
                          <button className="btn btn-error">
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Funcionarios;
