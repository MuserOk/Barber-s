import React, { useState, useEffect } from "react";

export default function Carousel() {
  const images = [
    "https://img.freepik.com/fotos-premium/joven-barbero-feliz-sonriendo-su-barberia_629685-82220.jpg",
    "https://img.freepik.com/fotos-premium/peluqueria-recortando-cabello-cliente-barberia_706756-1403.jpg",
    "https://img.freepik.com/foto-gratis/vista-lateral-hombre-peluqueria_23-2150665451.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
}, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex shrink-0 w-full">
            <img
              src={src}
              alt={`Service photo ${index + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}