import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PaginaBase from "./pages/PaginaBase";
import PaginaInicial from "./pages/PaginaInicial";
import PaginaBaseFormulario from "./pages/PaginaBaseFormulario";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import RotaPrivada from "./utils/RotaPrivada";

function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Dashboard />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;