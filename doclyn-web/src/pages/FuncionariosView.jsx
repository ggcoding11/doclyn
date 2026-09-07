import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const FuncionariosView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/funcionarios/${id}`);

      console.log(response.data);

      setFuncionario(response.data);
    };

    fetchData();
  }, []);

  return (
    <Sidebar activeMenu={"funcionarios"}>
      <div className="min-h-screen px-4 py-2 flex flex-col gap-4" id="main">
        <button className="btn w-20" onClick={() => navigate("/funcionarios")}>
          Voltar
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Dados do funcionário</h1>

          <h3>Consulte ou altere os dados do funcionário</h3>
        </div>

        {funcionario && (
          <div className="flex flex-col text-2xl gap-2">
            <div>
              <span className="font-semibold">Nome:</span> {funcionario.nome}
            </div>
            <div>
              <span className="font-semibold">CPF:</span> {funcionario.cpf}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {funcionario.email}
            </div>
            <div>
              <span className="font-semibold">Cargo:</span> {funcionario.cargo}
            </div>
            <div>
              <span className="font-semibold">Data de Admissão: </span>
              {funcionario.dataAdmissao}
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              {funcionario.status}
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default FuncionariosView;
