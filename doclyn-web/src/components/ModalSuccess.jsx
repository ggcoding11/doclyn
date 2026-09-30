import React from "react";
import { GiConfirmed } from "react-icons/gi";

const ModalSuccess = ({ title, subtitle, onClose }) => {
  return (
    <dialog id="modal-success" className="modal">
      <div className="modal-box flex flex-col items-center justify-center">
        <GiConfirmed className="text-7xl mb-2" />

        <h3 className="font-bold text-xl">{title}</h3>
        <p className="py-2 text-xl text-center">{subtitle}</p>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={onClose} className="btn">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalSuccess;
