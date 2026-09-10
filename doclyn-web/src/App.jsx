import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthContext } from "./contexts/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import FuncionariosPage from "./pages/funcionarios/FuncionariosPage";
import FuncionarioDetalhePage from "./pages/funcionarios/FuncionarioDetalhePage";
import EditarFuncionarioPage from "./pages/funcionarios/EditarFuncionarioPage";
import NovoFuncionarioPage from "./pages/funcionarios/NovoFuncionarioPage";
import DocumentosPage from "./pages/documentos/DocumentosPage";

const App = () => {
  const { isLoading } = useContext(AuthContext);

  return (
    <>
      {!isLoading && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios"
              element={
                <ProtectedRoute>
                  <FuncionariosPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios/:id"
              element={
                <ProtectedRoute>
                  <FuncionarioDetalhePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios/editar/:id"
              element={
                <ProtectedRoute>
                  <EditarFuncionarioPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios/salvar"
              element={
                <ProtectedRoute>
                  <NovoFuncionarioPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentos"
              element={
                <ProtectedRoute>
                  <DocumentosPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
