import axios from "axios";
import { api } from "./ApiClient";

export const findAll = () => {
  return api.get("/funcionarios");
};

export const save = () => {
  return api.post("/funcionarios", {
    cargo: "OFICIAL",
    cpf: "345.678.901-23",
    dataAdmissao: "2019-01-15",
    dataNascimento: "1982-11-30",
    email: "francisco.oliveira@email.com",
    nome: "Francisco Oliveira",
    status: "ATIVO",
    telefone: "(31) 98456-7890",
  });
};
