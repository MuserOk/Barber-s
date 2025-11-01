// src/components/home/Comments.jsx (Modificado)

import React, { useState, useEffect, useCallback } from "react";
import { useApi } from "../../hooks/useApi"; // <--- Importar useApi

export default function Comments() {
  const { data: apiComments, isLoading, error, execute } = useApi();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Función para cargar comentarios
  const fetchComments = useCallback(async () => {
      await execute('get', '/user/comments');
  }, [execute]);

  // Cargar comentarios al montar
  useEffect(() => {
      fetchComments();
  }, [fetchComments]);

  const comments = Array.isArray(apiComments) ? apiComments : [];
  // Lógica del carrusel
  useEffect(() => {
    if (!apiComments || apiComments.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % apiComments.length);
    }, 10000); // cada 10 segundos
    
    return () => clearInterval(interval);
  }, [apiComments]);
  
  // Usar los datos de la API o un array vacío si no hay datos
  /* const comments = apiComments || []; */

  // Manejo de estados de carga y error
  if (isLoading) {
      return <div className="max-w-xl mx-4 p-4 text-center text-gray-700">Cargando comentarios...</div>;
  }
  
  if (error) {
      return <div className="max-w-xl mx-4 p-4 text-center text-red-600">Error al cargar comentarios.</div>;
  }
  
  if (comments.length === 0) {
      return <div className="max-w-xl mx-4 p-4 text-center text-gray-500">Sé el primero en comentar!</div>;
  }


  return (
    <div className="max-w-xl mx-4 p-2 bg-white rounded-2xl shadow-lg max-h-44 mt-4">
      <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
        {/* Foto */}
        <img
          src={comments[currentIndex].photo}
          alt={comments[currentIndex].name}
          className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-gray-200"
        />

        {/* Texto del comentario */}
        <div>
          <p className="text-gray-700 italic">“{comments[currentIndex].text}”</p>
          <p className="text-sm text-gray-500 mt-2">— {comments[currentIndex].name}</p>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {comments.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}