import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginBackground from "/assets/login-background.jpg";
import Logo from "/assets/logo.png";
import ErrorIcon from "/assets/error-icon.png";
import { api } from "../services/ApiClient";
import { AuthContext } from "../contexts/AuthContext";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../css/Login.css";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setNewToken } = useContext(AuthContext);

  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { login, password });
      setNewToken(response.data.token);
      navigate("/home");
    } catch (err) {
      if (err.response.status === 401) {
        setError("Login ou usuário inválidos.");
      } else {
        setError("Erro ao tentar acessar. Tente novamente.");
      }

      setOpenModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 overflow-hidden">
        <div className="d-none d-sm-block col-5 p-0">
          <img
            src={LoginBackground}
            className="object-fit-cover w-100 h-100"
            alt="login-background"
          />
        </div>
        <div className="col-12 col-sm-7 bg-light-subtle">
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <div className="col-10 col-sm-10 col-md-8 col-lg-6 d-flex flex-column gap-2">
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <img src={Logo} className="img-fluid" alt="logo" />
                </div>

                <div className="mb-3">
                  <label className="form-label w-100">
                    <span className="fw-semibold">Login</span>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Digite o seu login"
                      onChange={(e) => setLogin(e.target.value)}
                      value={login}
                      required
                    />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label w-100">
                    <span className="fw-semibold">Senha</span>
                    <input
                      type="password"
                      className="form-control mt-2"
                      placeholder="Digite a sua senha"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Acessar
                </button>

                <Modal
                  open={openModal}
                  onClose={onCloseModal}
                  showCloseIcon={false}
                  classNames={{
                    modal: "customModal",
                  }}
                  center
                >
                  <div className="d-flex justify-content-center align-items-center flex-column gap-4">
                    <div className="text-center">
                      <img src={ErrorIcon} alt="error-icon" className="w-25" />
                    </div>

                    <div className="text-center fs-5">{error}</div>

                    <div>
                      <button
                        onClick={onCloseModal}
                        className="btn btn-secondary px-3"
                      >
                        Ok
                      </button>
                    </div>
                  </div>
                </Modal>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
