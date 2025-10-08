import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import CMSDashboard from "./assets/admin/cms";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import AuthGuard from "./Auth/Authguard.jsx";
import Info from "./components/Info.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={<App />} />
        {/* Halaman login */}
        <Route path="/login" element={<Login />} />
        {/* Halaman dashboard admin (protected) */}
            <Route path="/project/:id" element={<Info />} />
        {/* Halaman dashboard admin (protected) */}
        <Route 
          path="/admin" 
          element={
            <AuthGuard>
              <CMSDashboard />
            </AuthGuard>
          } 
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);