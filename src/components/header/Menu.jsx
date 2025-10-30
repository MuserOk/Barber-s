import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleBlockClick = (path, scrollToId) => {
    setOpen(false); // Cierra el menú

    // Si el item tiene scroll interno, no navegamos
    if (scrollToId) {
      const section = document.getElementById(scrollToId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Si tiene path, navegamos a esa ruta
    if (path) navigate(path);
  };

  const handleCloseOutside = () => {
    setOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Menú
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Sobre Nosotros", path: "/about" },
    { label: "Contáctos", scrollToId: "footer" },
  ];

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden pt-2"
        aria-label="Abrir menú"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="currentColor"
          className="w-10 h-10 text-gray-50 dark:text-white cursor-pointer hover:text-gray-400 active:text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex justify-start lg:hidden"
          onClick={handleCloseOutside}
        >
          <div
            className="bg-black/96 w-full md:hidden max-w-xs rounded-b-lg shadow-md p-6 mt-15 h-40 overflow-visible relative"
            onClick={stopPropagation}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-1 right-1 text-white font-bold hover:bg-gray-400 text-xl active:bg-gray-600 bg-gray-600/80 mt-4 mr-2 w-8 h-8 rounded flex justify-center items-center"
            >
              X
            </button>

            {/* Contenido */}
            <ul className="space-y-2 text-lg font-bold text-gray-600">
              {menuItems.map(({ label, path, scrollToId }, index) => (
                <li
                  key={index}
                  className="hover:text-white text-gray-500 active:text-gray-600 hover:bg-gray-400 w-60 px-4 rounded cursor-pointer"
                  onClick={() => handleBlockClick(path, scrollToId)}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
