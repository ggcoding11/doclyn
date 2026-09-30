import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import ModalError from "../../components/ModalError";
import ModalSuccess from "../../components/ModalSuccess";
import api from "../../services/api";
import FuncionarioForm from "../../components/FuncionarioForm";

const EditarFuncionarioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/funcionarios/${id}`);

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

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Editar dados do funcionário</h1>

          <h3>Altere os dados do funcionário</h3>
        </div>

        <div className="flex flex-col gap-2">
          {funcionario && (
            <FuncionarioForm
              funcionario={funcionario}
              id={id}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>
      </div>

      <ModalSuccess
        title={"Dados salvos!"}
        subtitle={"Os dados do funcionário foram salvos com sucesso!"}
        onClose={() => navigate("/funcionarios")}
      />

      <ModalError
        title={"Erro ao salvar funcionário!"}
        subtitle={errorMessage}
      />
    </Sidebar>
  );
};

export default EditarFuncionarioPage;
