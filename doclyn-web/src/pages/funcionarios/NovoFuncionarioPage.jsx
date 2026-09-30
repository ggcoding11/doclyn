import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { CargoSelect } from "../../components/CargoSelect";
import { StatusSelect } from "../../components/StatusSelect";
import { PatternFormat } from "react-number-format";
import ModalError from "../../components/ModalError";
import ModalSuccess from "../../components/ModalSuccess";

const NovoFuncionarioPage = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [cargo, setCargo] = useState("");
  const [status, setStatus] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hoje = new Date().toLocaleDateString("en-CA");

    if (dataNascimento >= hoje) {
      openModalError("A data de nascimento deve ser anterior à data de hoje!");
      return;
    }

    if (dataAdmissao > hoje) {
      openModalError(
        "A data de admissão deve ser mais antiga ou igual a data de hoje!",
      );
      return;
    }

    const payload = {
      nome,
      cpf,
      telefone,
      email,
      dataNascimento,
      dataAdmissao,
      cargo,
      status,
    };

    try {
      await api.post(`/funcionarios`, payload);
      openModalSuccess();
    } catch (error) {
      console.log(error);

      openModalError("Ocorreu um erro ao salvar o funcionário.");
    }
  };

  const openModalSuccess = () => {
    document.getElementById("modal-success").showModal();
  };

  const openModalError = (message) => {
    document.getElementById("modal-error").showModal();

    setErrorMessage(message);
  };

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
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label" htmlFor="nome">
                Nome<span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                id="nome"
                className="input w-full"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome..."
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="cpf">
                CPF<span className="text-red-700">*</span>
              </label>

              <PatternFormat
                id="cpf"
                className="input w-full"
                format="###.###.###-##"
                pattern="^\d{3}\.\d{3}\.\d{3}-\d{2}$"
                value={cpf}
                onValueChange={(values) => {
                  setCpf(values.value);
                }}
                required
                allowEmptyFormatting
                mask="_"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="telefone">
                Telefone<span className="text-red-700">*</span>
              </label>
              <PatternFormat
                id="telefone"
                className="input w-full"
                format="(##) #####-####"
                pattern="^\(\d{2}\)\s\d{5}-\d{4}$"
                value={telefone}
                onValueChange={(values) => {
                  setTelefone(values.value);
                }}
                required
                allowEmptyFormatting
                mask="_"
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="email">
                E-mail<span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite o e-mail..."
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="dataNascimento">
                Data de Nascimento<span className="text-red-700">*</span>
              </label>
              <input
                type="date"
                id="dataNascimento"
                className="input w-full"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                placeholder="Digite a data de nascimento..."
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <label className="label" htmlFor="dataAdmissao">
                Data de Admissão<span className="text-red-700">*</span>
              </label>
              <input
                type="date"
                id="dataAdmissao"
                className="input w-full"
                value={dataAdmissao}
                onChange={(e) => setDataAdmissao(e.target.value)}
                placeholder="Digite a data de admissão..."
                required
              />
            </fieldset>

            <fieldset className="fieldset">
              <CargoSelect
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required={true}
              />
            </fieldset>

            <fieldset className="fieldset">
              <StatusSelect
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required={true}
              />
            </fieldset>

            <button type="submit" className="btn btn-outline mt-4 w-full">
              Salvar
            </button>
          </form>
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
