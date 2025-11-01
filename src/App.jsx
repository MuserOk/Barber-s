import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Header from "./components/app/HeaderApp";
import FooterApp from "./components/app/FooterApp";
import LogIn from "./pages/logIn";
import UserPage from "./pages/userPage"
import RegUser from "./pages/regUser";
import RecPass from "./pages/recPass";
import BarberPage from "./pages/barberPage";
import AdmiPage from "./pages/admiPage"
import ProtectedRoute from "./components/ProtectedRouter";
/* import AuthContext from "./context/AuthContext"; */


const ROLE_ADMIN = 1;
const ROLE_BARBER = 2;
const ROLE_CLIENT = 3;


function App() {

  // modo oscuro
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, []);


  return (

    <div className="flex flex-col bg-[#1a1802] text-white">
      <Header />
      {/*HERO*/}

      <main className='flex justify-start flex-col text-white '>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/regUser" element={<RegUser />} />
          <Route path="/recPass" element={<RecPass />} />
          <Route path="/about" element={<About />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute allowedRoles={[ROLE_CLIENT, ROLE_BARBER, ROLE_ADMIN]} />}>
            {/* Esta ruta es para cualquier usuario logueado */}
            <Route path="/userPage" element={<UserPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[ROLE_BARBER, ROLE_ADMIN]} />}>
            {/* Solo Barbero y Admin pueden acceder */}
            <Route path="/barberPage" element={<BarberPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]} />}>
            {/* Solo Admin puede acceder */}
            <Route path="/admiPage" element={<AdmiPage />} />
          </Route>

        </Routes>
      </main>
      <FooterApp />
    </div>

  );
}

export default App;

