import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaPencilAlt, FaRegEye, FaRegTrashAlt } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { convertAmericanDateToBrazilian } from "../../utils/ConvertAmericanDateToBrazilian";
import { formatCPF } from "../../utils/FormatCPF";
import ModalSuccess from "../../components/ModalSuccess";
import { openModalSuccess } from "../../utils/OpenModalSuccess";

const funcionarioTableFields = [
  {
    id: 0,
    fieldName: "id",
    label: "#",
  },
  {
    id: 1,
    fieldName: "nome",
    label: "Nome",
  },
  {
    id: 2,
    fieldName: "cargo",
    label: "Cargo",
  },
  {
    id: 3,
    fieldName: "cpf",
    label: "CPF",
  },
  {
    id: 4,
    fieldName: "dataAdmissao",
    label: "Data de Admissão",
  },
  {
    id: 5,
    fieldName: "status",
    label: "Status",
  },
];

const FuncionariosPage = () => {
  const navigate = useNavigate();

  const [funcionarios, setFuncionarios] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [idToBeDeleted, setIdToBeDeleted] = useState(null);

  const [reload, setReload] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/funcionarios?sortField=${sortField}&sortDirection=${sortDirection}&pageNumber=${currentPage}`,
        );

        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.number);
        setFuncionarios(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [sortField, sortDirection, currentPage, reload]);

  const SortButton = ({ field }) => {
    const sortByField = () => {
      setSortField(field);

      if (sortDirection === "desc") {
        setSortDirection("asc");
      } else {
        setSortDirection("desc");
      }
    };

    return sortField === field ? (
      sortDirection === "desc" ? (
        <BsSortDown
          className="text-xl cursor-pointer"
          onClick={() => sortByField(field)}
        />
      ) : (
        <BsSortDownAlt
          className="text-xl cursor-pointer"
          onClick={() => sortByField(field)}
        />
      )
    ) : (
      <BiSortAlt2
        className="text-xl cursor-pointer"
        onClick={() => sortByField(field)}
      />
    );
  };

  const toPreviousPage = () => {
    const firstPage = 0;
    const previousPage = currentPage - 1;

    if (previousPage < firstPage) {
      return;
    }

    setCurrentPage(previousPage);
  };

  const toNextPage = () => {
    const finalPage = totalPages - 1;
    const nextPage = currentPage + 1;

    if (nextPage > finalPage) {
      return;
    }

    setCurrentPage(nextPage);
  };

  const toResetPage = () => {
    setCurrentPage(0);
  };

  const openModalDelete = () => {
    document.getElementById("modal-delete").showModal();
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/funcionarios/${idToBeDeleted}`);

      openModalSuccess();

      setReload(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar activeMenu={"funcionarios"}>
      <div className="min-h-screen px-4 py-2 gap-2" id="main">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-0 items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">Funcionários</h1>

              <h3>Gerencie todos os funcionários da empresa</h3>
            </div>

            <div className="flex justify-end">
              <button
                className="btn w-30 sm:w-80"
                onClick={() => navigate("/funcionarios/salvar")}
              >
                Criar novo
              </button>
            </div>
          </div>

          <div className="min-h-screen flex flex-col justify-between items-center gap-6">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
              <table className="table">
                <thead>
                  <tr>
                    {funcionarioTableFields.map((field) => (
                      <th key={field.id}>
                        <div className="flex items-center gap-2">
                          <span>{field.label}</span>
                          <SortButton field={field.fieldName} />
                        </div>
                      </th>
                    ))}

                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {funcionarios?.map((funcionario) => (
                    <tr key={funcionario.id}>
                      <th>{funcionario.id}</th>
                      <td>{funcionario.nome}</td>
                      <td>{funcionario.cargo}</td>
                      <td>{formatCPF(funcionario.cpf)}</td>
                      <td>
                        {convertAmericanDateToBrazilian(
                          funcionario.dataAdmissao,
                        )}
                      </td>
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
                          <button
                            onClick={() => {
                              setIdToBeDeleted(funcionario.id);
                              openModalDelete();
                            }}
                            className="btn btn-error"
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="join">
              <button onClick={toPreviousPage} className="join-item btn">
                «
              </button>
              <button onClick={toResetPage} className="join-item btn">
                Página {currentPage + 1}
              </button>
              <button onClick={toNextPage} className="join-item btn">
                »
              </button>
            </div>
          </div>
        </div>
      </div>

      <dialog id="modal-delete" className="modal">
        <div className="modal-box flex flex-col items-center justify-center">
          <h3 className="text-center font-bold text-lg">
            Tem certeza que deseja remover o funcionário?
          </h3>
          <p className="text-center text-lg py-2">
            Essa ação não pode ser desfeita!
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <div className="flex gap-4">
                <button onClick={handleDelete} className="btn btn-error">
                  Remover
                </button>
                <button className="btn">Fechar</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <ModalSuccess
        title={"Operação foi concluída"}
        subtitle={"O funcionário foi removido com sucesso!"}
      />
    </Sidebar>
  );
};

export default FuncionariosPage;
