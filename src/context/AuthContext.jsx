import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // intenta mantener sesión (ej: si el token o cookie sigue válida)
    const token = localStorage.getItem("hs_token");
    if (token) {
      setUser({ logged: true });
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("./auth/login", { email, password });
    const token = res.data.token || res.data.access;

    if (token) localStorage.setItem("hs_token", token);
    localStorage.setItem("use_email", email)


    setUser({ logged: true, email });
    return res.data;
  };


  const logout = async () => {
    // Limpiar token / sesión
    localStorage.removeItem("token");
    setUser(null); // 
  };



  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
