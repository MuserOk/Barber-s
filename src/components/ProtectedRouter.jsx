import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente para proteger rutas.
 * @param {number} [allowedRoles] - Array de IDs de roles permitidos (ej: [1, 2] para Admin y Barbero).
 */
export default function ProtectedRoute({ allowedRoles }) {
    const { user, isLoading } = useAuth();

    // 1. Mostrar un estado de carga mientras se verifica la sesión 
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#1a1802] text-white">
                <p className="text-xl animate-pulse">Verificando sesión...</p>
            </div>
        );
    }

    // 2. Verificar si el usuario está autenticado
    if (!user) {
        // Si no hay usuario, redirigir al login
        return <Navigate to="/logIn" replace />;
    }

    // 3. Verificar el rol (si se especificó)
    if (allowedRoles && !allowedRoles.includes(user.rolId)) {
        // Si el rol no está permitido, redirigir a una página de acceso denegado o a la página de inicio
        alert("Acceso denegado. Tu rol no tiene permiso para esta página.");
        return <Navigate to="/" replace />;
    }

    // 4. Si todo es correcto, renderizar el contenido de la ruta
    return <Outlet />;
}