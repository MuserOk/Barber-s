// pages/LogIn.jsx (Modificado)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <--- Importar useAuth
import { useApi } from "../hooks/useApi"; // <--- Importar useApi (para estados de carga/error)

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useAuth(); // <--- Obtener la función login del contexto
  const { isLoading, error, execute } = useApi(); // <--- Usar useApi para estados

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del botón

    // Validación simple
    if (!formData.email || !formData.password) {
        alert("Por favor, ingresa email y contraseña.");
        return;
    }

    // 1. Ejecutar la lógica de login del contexto
    // Nota: El contexto ya maneja la petición POST a /api/auth/login
    const result = await login(formData.email, formData.password);

    // 2. Manejar la respuesta
    if (result.success) {
        alert(`✅ ¡Bienvenido, ${result.user.nombre}!`);
        
        // Redirigir según el rol (cumpliendo con la estructura de tu app)
        if (result.user.rolId === 1) { // Asumiendo 1 = Admin
            navigate("/admiPage");
        } else if (result.user.rolId === 2) { // Asumiendo 2 = Barbero
            navigate("/barberPage");
        } else { // Asumiendo 3 = Cliente
            navigate("/userPage");
        }
    } else {
        // Mostrar el mensaje de error que viene del contexto/backend
        alert(`❌ Error de Login: ${result.message}`);
    }
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

        <form onSubmit={handleLogin}> {/* <--- Usar el formulario para manejar el submit */}
            {/* Campo de Email */}
            <div className="mb-4">
              <label className="block text-gray-100 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="mb-6">
              <label className="block text-gray-100-text-sm font-bold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Mensaje de Carga */}
            {isLoading && (
                <p className="text-amber-400 text-center font-medium mb-4">
                    Iniciando sesión...
                </p>
            )}
            
            {/* Mensaje de Error (Opcional, si no usamos la alerta de JS) */}
            {error && (
                <p className="text-red-500 text-center font-medium mb-4">
                    Error: {error}
                </p>
            )}

            {/* Botones para los distintos tipos de usuario */}
            <div className="space-y-2 flex flex-col items-center">
              <button
                type="submit" // <--- Cambiar a type="submit"
                disabled={isLoading}
                className="w-[70%] m-auto text-white bg-gray-800 shadow-xs hover:bg-gray-700 active:bg-gray-900 shadow-black font-bold py-2 px-4 rounded transition disabled:opacity-50"
              >
                {isLoading ? 'Verificando...' : 'Entrar'}
              </button>
            </div>
        </form>

        <div className="space-y-2 flex flex-col items-center pt-4">
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