import React, { useState, useEffect } from "react";

export default function Comments() {
  const comments = [
    {
      name: "Juan Pérez",
      photo: "https://img.freepik.com/fotos-premium/joven-barbero-feliz-sonriendo-su-barberia_629685-82220.jpg",
      text: "Excelente atención y muy buenos cortes. Siempre salgo conforme.",
    },
    {
      name: "Carlos Gómez",
      photo: "https://img.freepik.com/fotos-premium/peluqueria-recortando-cabello-cliente-barberia_706756-1403.jpg",
      text: "Ambiente cómodo y relajado. Se nota que aman lo que hacen.",
    },
    {
      name: "Matías Rodríguez",
      photo: "https://img.freepik.com/foto-gratis/vista-lateral-hombre-peluqueria_23-2150665451.jpg",
      text: "Recomiendo totalmente. La barba me quedó impecable.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % comments.length);
    }, 10000); // cada 10 segundos
    return () => clearInterval(interval);
  }, [comments.length]);

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
