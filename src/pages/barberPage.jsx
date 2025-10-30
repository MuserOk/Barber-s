import React, { useState } from 'react'
import Calendario from '../components/barber/calendar'
import Performance from '../components/barber/performance'
import Perfil from '../components/barber/perfil'


export default function BarberPage() {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('calendario')

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
            <Calendario/>
        )}


        {activeTab === 'rendimiento' && (
          <div className="p-4 text-gray-800">
           <Performance/>
          </div>
        )}


        {activeTab === 'perfil' && (
          <div className="p-4 text-gray-800 flex flex-col items-center gap-6 max-w-200 m-auto">
            <Perfil/>
          </div>
        )}
      </div>
    </>
  )
}
