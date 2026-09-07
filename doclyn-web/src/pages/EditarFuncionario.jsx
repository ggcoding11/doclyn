import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { GiConfirmed } from "react-icons/gi";
import { convertBrazilianDateToAmerican } from "../utils/ConvertBrazillianDateToAmerican";

const EditarFuncionario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [cargo, setCargo] = useState("");
  const [status, setStatus] = useState("");

  const [funcionario, setFuncionario] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/funcionarios/${id}`);

      setFuncionario(response.data);

      setNome(response.data.nome);
      setCpf(response.data.cpf);
      setTelefone(response.data.telefone);
      setEmail(response.data.email);
      setDataNascimento(response.data.dataNascimento);
      setDataAdmissao(response.data.dataAdmissao);
      setCargo(response.data.cargo);
      setStatus(response.data.status);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setDataNascimento(convertBrazilianDateToAmerican(dataNascimento));
    setDataAdmissao(convertBrazilianDateToAmerican(dataAdmissao));

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
      const response = await api.put(`/funcionarios/${id}`, payload);
      console.log(response);
      openModalSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const openModalSuccess = () => {
    document.getElementById("modal-success").showModal();
  };

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
                <input
                  type="text"
                  id="cpf"
                  className="input w-full"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Digite o CPF..."
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="telefone">
                  Telefone<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="telefone"
                  className="input w-full"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="Digite o telefone..."
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="email">
                  E-mail<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
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
                <label className="label" htmlFor="cargo">
                  Cargo<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="cargo"
                  className="input w-full"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Digite o cargo..."
                  required
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="status">
                  Status<span className="text-red-700">*</span>
                </label>
                <input
                  type="text"
                  id="status"
                  className="input w-full"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="Digite o status..."
                  required
                />
              </fieldset>

              <button type="submit" className="btn btn-success mt-4 w-full">
                Editar
              </button>
            </form>
          )}
        </div>
      </div>

      <dialog id="modal-success" className="modal">
        <div className="modal-box flex flex-col items-center justify-center">
          <GiConfirmed className="text-7xl mb-2" />

          <h3 className="font-bold text-xl">Dados atualizados!</h3>
          <p className="py-2 text-xl text-center">
            Os dados do funcionário foram alterados com sucesso!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Fechar</button>
            </form>
          </div>
        </div>
      </dialog>
    </Sidebar>
  );
};

export default EditarFuncionario;
