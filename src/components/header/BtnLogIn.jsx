// src/components/header/BtnLogIn.jsx (Modificado)

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // <--- Importar useAuth

export default function BtnLogIn() {
  const navigate = useNavigate();
  // Obtener el estado del usuario y la función de logout del contexto
  const { user, logout } = useAuth(); // <--- Usar useAuth

  const handleClick = async () => { // <--- Hacer la función asíncrona
    if (user) {
      // Si ya está logueado, cerrar sesión
      await logout(); // <--- Llamar a la función de logout del contexto
      alert("✅ Sesión cerrada exitosamente.");
      navigate("/"); // Redirigir a la página de inicio
    } else {
      // Si no hay usuario, navegar al login
      navigate("/logIn");
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer"> {/* Añadir cursor-pointer al div principal */}
      <div className=" text-xs sm:text-sm md:text-[1rem] lg:text-[2rem] bg-gray-900 hover:bg-gray-700 active:bg-gray-800 px-2 py-1 lg:py-3 lg:px-6 inline-block  rounded">
      {/* El texto es dinámico basado en el estado 'user' */}
      {!user ? "Iniciar Sesión" : "Cerrar Sesión"}
      </div>
    </div>
  );
}