import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Funcionarios from "./pages/Funcionarios";
import Documentos from "./pages/Documentos";

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
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/funcionarios"
              element={
                <ProtectedRoute>
                  <Funcionarios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentos"
              element={
                <ProtectedRoute>
                  <Documentos />
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
