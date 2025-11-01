// src/components/user/cardsTendencias.jsx (Modificado)

import React from 'react'

// El componente ahora recibe el array de tendencias como una prop
// El array ya fue cargado desde la API en UserPage.jsx
export default function CardsTendencias({ tendencias }) { 
    
    // Si por alguna razón no se pasan tendencias, mostramos un mensaje
    if (!tendencias || tendencias.length === 0) {
        return (
            <div className="md:col-span-4 text-center p-8 text-gray-700">
                <p className="text-xl font-semibold">No hay tendencias de corte disponibles en este momento.</p>
                <p className="text-sm">Vuelve pronto para ver los nuevos estilos.</p>
            </div>
        );
    }
    
    return (
        <>
            {/* Usamos el array de la prop */}
            {tendencias.map((corte) => (
                <div 
                    // Usamos id_tendencia y imagen_url de la DB
                    key={corte.id_tendencia} 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group min-w-[246px] max-w-[280px]"
                >
                    {/* Imagen con efecto hover */}
                    <div className="relative overflow-hidden">
                        <img 
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                            // Usamos la columna imagen_url de la DB
                            src={corte.imagen_url} 
                            alt={`Corte de tendencia ${corte.nombre}`} 
                        />
                        {/* Badge de tendencia */}
                        <div className="absolute top-3 right-3">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                🔥 TENDENCIA
                            </span>
                        </div>
                        {/* Overlay en hover */}
                        <div className="absolute inset-0  md:bg-black/80 bg-opacity-0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                    
                    {/* Contenido de la tarjeta */}
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                {corte.nombre}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                #{corte.id_tendencia.toString().padStart(2, '0')} {/* Usamos id_tendencia */}
                            </span>
                        </div>
                        
                        {/* Botón de acción */}
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
                                Lo quiero
                            </button>
                            <button className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                                ❤️
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}