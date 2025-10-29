import React, { useState } from 'react'
import FormTurno from '../components/user/formTurno'
import CardsTendencias from '../components/user/cardsTendencias'
import Perfil from '../components/user/perfil'

export default function UserPage() {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('tendencias')

  return (
    <>
      {/* 🔹 Barra de pestañas */}
      <div className="flex bg-gray-500 m-auto h-10 text-xs justify-around items-end w-full">
        {[
          { id: 'tendencias', label: 'Tendencias' },
          { id: 'perfil', label: 'Mi Perfil' },
          { id: 'nuevo', label: 'Nuevo Turno' },
          { id: 'historial', label: 'Historial' },
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
      <div className="bg-gray-300 p-4 min-h-[400px]">
        {activeTab === 'tendencias' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
            <CardsTendencias />
          </div>
        )}

        {activeTab === 'perfil' && (
          <div className="p-4 text-gray-800">
            <h2 className="text-xl font-bold mb-2">Mi Perfil</h2>
            <Perfil/>
          </div>
        )}

        {activeTab === 'nuevo' && (
          <div className="p-4">
            <FormTurno />
          </div>
        )}

        {activeTab === 'historial' && (
          <div className="p-4 text-gray-800">
            <h2 className="text-xl font-bold mb-2">Historial de Turnos</h2>
            <p>Aquí se mostrarán tus turnos anteriores y reseñas.</p>
          </div>
        )}
      </div>
    </>
  )
}
