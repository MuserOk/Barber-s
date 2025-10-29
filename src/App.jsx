import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Header from "./components/app/HeaderApp";
import FooterApp from "./components/app/FooterApp";
import LogIn from "./pages/logIn";
import UserPage from "./pages/userPage"
/* import AuthContext from "./context/AuthContext"; */




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
        <section className='relative'>
          <img className='opacity-60 m-auto w-full max-w-200 lg:max-h-86' src="https://img.freepik.com/fotos-premium/barber-shop-with-vintage-aesthetic-showcasing-the-history-and-tradition-of-the-shop_117038-13572.jpg" alt="foto de barbero y cliente" />
          <h1 className='absolute top-1/2 animate-pulse  transform -translate-1/2 left-1/2 text-4xl font-medium'>
            Brother´s
          </h1>
        </section>
        <main  className='flex justify-start flex-col text-white lg:max-w-200 lg:m-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/userPage" element={<UserPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <FooterApp />
      </div>
   
  );
}

export default App;

