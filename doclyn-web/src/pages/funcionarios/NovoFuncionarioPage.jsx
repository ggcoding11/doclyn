import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import ModalError from "../../components/ModalError";
import ModalSuccess from "../../components/ModalSuccess";
import FuncionarioForm from "../../components/FuncionarioForm";

const NovoFuncionarioPage = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Sidebar activeMenu={"funcionarios"}>
      <div className="px-4 py-2 flex flex-col gap-4" id="main">
        <button className="btn w-20" onClick={() => navigate("/funcionarios")}>
          Voltar
        </button>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">Salvar dados do funcionário</h1>

          <h3>Insira os dados do funcionário</h3>
        </div>

        <div className="flex flex-col gap-2">
          <FuncionarioForm setErrorMessage={setErrorMessage} />
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

export default NovoFuncionarioPage;
