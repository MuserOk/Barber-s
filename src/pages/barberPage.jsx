import React, { useState, useEffect } from 'react'
import Calendario from '../components/barber/calendar'
import Performance from '../components/barber/performance'
import Perfil from '../components/barber/perfil'
import { useApi } from '../hooks/useApi' // <--- Importar useApi

export default function BarberPage() {
  const [activeTab, setActiveTab] = useState('calendario')
  const [barberData, setBarberData] = useState(null); // Estado para los datos del barbero

  // Usar useApi para la petición
  const { isLoading, error, execute } = useApi();

  // Cargar datos del barbero al montar el componente
  useEffect(() => {
    const loadBarberData = async () => {
      // Usamos la ruta /api/user/perfil que ya creamos (protegida por JWT)
      const result = await execute('get', '/user/perfil');
      if (result.success) {

        // Mapear los detalles para que Perfil los reciba como 'details'
        const data = {
          ...result.data,
          details: result.data.barberDetails || {} // Asegurar que 'details' exista
        }

        setBarberData(data);

      } else {
        console.error("Error al cargar datos del barbero:", result.error);
        // Aquí podrías forzar un logout si el error es 401 (no autorizado)
      }
    };
    loadBarberData();
  }, [execute]);


  // 1. Manejo de Carga y Error
  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-300 text-gray-800">
        <p className="text-xl font-semibold">Cargando panel del Barbero...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] p-4 bg-red-100 border border-red-400 text-red-700">
        <p className="font-bold">Error de Carga:</p>
        <p>{error}</p>
      </div>
    );
  }

  // 2. Si no hay datos (y no hubo error), puede ser un problema de rol
  if (!barberData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-300 text-gray-800">
        <p className="text-xl font-semibold">Datos de Barbero no disponibles.</p>
      </div>
    );
  }


  return (
    <>
      {/* 🔹 Barra de pestañas */}
      <div className="flex bg-gray-500 m-auto h-10 text-xs justify-around items-end w-full  sm:text-sm md:text-[1rem] lg:text-lg">
        {[
          { id: 'calendario', label: 'Calendario' },
          { id: 'rendimiento', label: 'Rendimiento' },
          { id: 'perfil', label: 'Mi Perfil' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full p-1 rounded-tl rounded-tr transition-colors duration-200
              ${activeTab === tab.id
                ? 'bg-gray-300 text-gray-900 font-semibold'
                : 'hover:bg-gray-400 hover:text-gray-950 text-white'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 🔹 Contenido dinámico según la pestaña */}
      <div className="bg-gray-300 min-h-[400px]">
        {activeTab === 'calendario' && (
          // Pasar datos del barbero al Calendario
          <Calendario barberData={barberData} />
        )}


        {activeTab === 'rendimiento' && (
          <div className="p-4 text-gray-800">
            {/* Pasar datos del barbero al Performance */}
            <Performance barberData={barberData} />
          </div>
        )}


        {activeTab === 'perfil' && (
          <div className="p-4 text-gray-800 flex flex-col items-center gap-6 max-w-200 m-auto">
            {/* Pasar datos del barbero al Perfil */}
            <Perfil initialData={barberData} />
          </div>
        )}
      </div>
    </>
  )
}