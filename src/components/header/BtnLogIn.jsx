import React from "react";
import { useNavigate } from "react-router-dom";

export default function BtnLogIn() {
  const navigate = useNavigate();

  // Si más adelante tenés un sistema de autenticación, esto podrá venir de un contexto
  const user = null; // Por ahora, asumimos que no hay usuario logueado

  const handleClick = () => {
    if (user) {
      // Si ya está logueado, podrías abrir un modal o cerrar sesión
      console.log("Cerrar sesión");
    } else {
      // Si no hay usuario, navegar al login
      navigate("/logIn");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer text-xs bg-gray-900 hover:bg-gray-700 active:bg-gray-800 px-2 py-1 rounded w-full text-white text-center"
    >
      {!user ? "Iniciar Sesión" : "Cerrar Sesión"}
    </div>
  );
}
