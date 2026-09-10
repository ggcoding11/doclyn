import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { formatCPF } from "../utils/FormatCPF";
import { convertAmericanDateToBrazilian } from "../utils/ConvertAmericanDateToBrazilian";
import { formatPhoneNumber } from "../utils/FormatPhoneNumber";

const VerFuncionario = () => {
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
      <div className="px-4 py-2 flex flex-col gap-4" id="main">
        <button className="btn w-20" onClick={() => navigate("/funcionarios")}>
          Voltar
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-xl font-semibold">Dados do funcionário</h1>

            <h3>Consulte ou altere os dados do funcionário</h3>
          </div>

          <button
            className="btn btn-success w-20"
            onClick={() => navigate(`/funcionarios/editar/${id}`)}
          >
            Editar
          </button>
        </div>

        {funcionario && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
              <div>
                <h1 className="text-xl font-bold">{funcionario.nome}</h1>
                <h3>{funcionario.cargo}</h3>
              </div>

              <div className="flex flex-col">
                <span className="font-bold">Status:</span>
                <span>{funcionario.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
              <div className="flex flex-col">
                <span className="font-bold">CPF:</span>
                <span> {formatCPF(funcionario.cpf)}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold"> Data de Nascimento:</span>
                {convertAmericanDateToBrazilian(funcionario.dataNascimento)}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
              <div className="flex flex-col">
                <span className="font-bold">E-mail:</span>
                <span> {funcionario.email}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold"> Telefone:</span>
                {formatPhoneNumber(funcionario.telefone)}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-0">
              <div className="flex flex-col">
                <span className="font-bold">Data de Admissão:</span>
                <span>
                  {convertAmericanDateToBrazilian(funcionario.dataAdmissao)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
};

export default VerFuncionario;
