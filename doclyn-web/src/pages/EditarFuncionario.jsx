import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

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
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const response = await api.put(`/funcionarios/${id}`, payload);
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
                  value={funcionario.nome}
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
                  value={funcionario.cpf}
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
                  value={funcionario.telefone}
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
                  value={funcionario.email}
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
                  type="text"
                  id="dataNascimento"
                  className="input w-full"
                  value={funcionario.dataNascimento}
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
                  type="text"
                  id="dataAdmissao"
                  className="input w-full"
                  value={funcionario.dataAdmissao}
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
                  value={funcionario.cargo}
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
                  value={funcionario.status}
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
    </Sidebar>
  );
};

export default EditarFuncionario;
