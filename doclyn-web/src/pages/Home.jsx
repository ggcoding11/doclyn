import React from "react";
import { findAll, save } from "../services/FuncionarioService";

const Home = () => {
  return (
    <div>
      <button
        onClick={async () => {
          const response = await findAll();

          console.log(response.data);
        }}
      >
        Clique em mim
      </button>

      <button
        onClick={async () => {
          const response = await save();

          console.log(response.data);
        }}
      >
        Fazer POST
      </button>
    </div>
  );
};

export default Home;
