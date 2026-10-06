import React, { useState } from "react";
import { CargoSelect } from "./CargoSelect";
import { StatusSelect } from "./StatusSelect";
import { PatternFormat } from "react-number-format";
import api from "../services/api";

const FuncionarioForm = ({ funcionario, id, setErrorMessage }) => {
  const [nome, setNome] = useState(funcionario?.nome || "");
  const [cpf, setCpf] = useState(funcionario?.cpf || "");
  const [telefone, setTelefone] = useState(funcionario?.telefone || "");
  const [email, setEmail] = useState(funcionario?.email || "");
  const [dataNascimento, setDataNascimento] = useState(
    funcionario?.dataNascimento || "",
  );
  const [dataAdmissao, setDataAdmissao] = useState(
    funcionario?.dataAdmissao || "",
  );
  const [cargo, setCargo] = useState(funcionario?.cargo || "");
  const [status, setStatus] = useState(funcionario?.status || "");

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
      if (funcionario == null) {
        await api.post(`/funcionarios`, payload);
      } else {
        await api.put(`/funcionarios/${id}`, payload);
      }
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
  );
};

export default FuncionarioForm;
