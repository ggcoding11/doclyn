import React from "react";
import { VscError } from "react-icons/vsc";

const ModalError = ({ title, subtitle }) => {
  return (
    <dialog id="modal-error" className="modal">
      <div className="modal-box flex flex-col items-center justify-center">
        <VscError className="text-7xl mb-2" />

        <h3 className="font-bold text-xl">{title}</h3>
        <p className="py-2 text-xl text-center">{subtitle}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalError;
