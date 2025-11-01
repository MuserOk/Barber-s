import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig"; // Usamos el archivo que creamos

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    // Función para verificar la sesión al cargar la app
    const checkSession = async () => {
      try {
        // El navegador enviará automáticamente la cookie 'hs_token'
        const res = await api.get("/auth/check-session"); 
        
        // Si es exitoso, el backend devuelve los datos del usuario
        setUser(res.data.user);
      } catch (e) {
        // Si falla (no hay cookie, expiró, etc.), el usuario es null
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const login = async (email, password) => {
    try {
      // El backend establecerá la cookie 'hs_token' en la respuesta
      const res = await api.post("/auth/login", { email, password });
      
      // El backend devuelve el objeto user (sin token)
      setUser(res.data.user);
      return { success: true, user: res.data.user };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error de conexión o credenciales.";
      return { success: false, message: errorMessage };
    }
  };


  const logout = async () => {
    try {
        // El backend eliminará la cookie
        await api.post("/auth/logout");
    } catch (e) {
        console.error("Error al cerrar sesión en el servidor:", e);
    }
    setUser(null); 
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);