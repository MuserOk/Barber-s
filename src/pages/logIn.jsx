// pages/LogIn.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();

  // Ejemplo: funciones para manejar los botones
  const handleLogin = () => {
    // Podés validar el email y contraseña aquí antes de redirigir
    navigate("/userPage");
  };

  // recuperar contraseña
  const handleRecPass = () => {
    navigate("/recPass");
  };

  // registrarse como nuevo
  const handleRegUser = () => {
    navigate("/regUser");
  };

  return (
    <div className=" flex items-center justify-center py-8 text-sm flex-col gap-6 px-2">
      <div className="bg-[#525252] rounded-lg shadow-md min-w-[270px] px-4">
        <h2 className="text-2xl font-bold my-6 text-center">Iniciar Sesión</h2>

        {/* Campo de Email */}
        <div className="mb-4">
          <label className="block text-gray-100 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label className="block text-gray-100 text-sm font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

        {/* Botones para los distintos tipos de usuario */}
        <div className="space-y-2 flex flex-col items-center">
          <button
            onClick={handleLogin}
            className="w-[70%] m-auto text-white bg-gray-800 shadow-xs hover:bg-gray-700 active:bg-gray-900 shadow-black font-bold py-2 px-4 rounded transition"
          >
            Entrar
          </button>

          <button
            onClick={handleRecPass}
            className="w-full text-red-800 hover:text-red-700 active:bg-red-900 py-2 px-4 rounded transition"
          >
            Recuperar contraseña
          </button>

          <button
            onClick={handleRegUser}
            className="w-full  text-white py-2 px-4 rounded transition"
          >
            <p>¿ Eres Nuevo ?</p>
             <p className="text-orange-900 font-medium cursor-pointer hover:text-orange-700 active:text-orange-800">Crea un usuario gratis!</p> 
          </button>
        </div>
      </div>
    </div>
  );
}
