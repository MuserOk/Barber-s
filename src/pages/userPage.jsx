import React, { useState,useEffect } from 'react'
import FormTurno from '../components/user/formTurno'
import CardsTendencias from '../components/user/cardsTendencias'
import Perfil from '../components/user/perfil'
import Historial from '../components/user/historial'
import { useApi } from '../hooks/useApi'



export default function UserPage() {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState('tendencias')

// Estados para los datos dinámicos
  const [tendenciasData, setTendenciasData] = useState([]);
  const [perfilData, setPerfilData] = useState(null);

  // Usar useApi para las peticiones
  const { isLoading: isTendenciasLoading, error: tendenciasError, execute: fetchTendencias } = useApi();
  const { isLoading: isPerfilLoading, error: perfilError, execute: fetchPerfil } = useApi();

    // Cargar datos al montar el componente
  useEffect(() => {
    // Cargar Tendencias
    const loadTendencias = async () => {
      const result = await fetchTendencias('get', '/user/tendencias');
      if (result.success) {
        setTendenciasData(result.data);
      } else {
        console.error("Error al cargar tendencias:", result.error);
        // Aquí podrías mostrar una alerta al usuario
      }
    };

    // Cargar Perfil
    const loadPerfil = async () => {
      const result = await fetchPerfil('get', '/user/perfil');
      if (result.success) {
        setPerfilData(result.data);
      } else {
        console.error("Error al cargar perfil:", result.error);
        // Aquí podrías mostrar una alerta al usuario
      }
    };

    loadTendencias();
    loadPerfil();
  }, [fetchTendencias, fetchPerfil]);


  // Lógica de renderizado de contenido
  const renderContent = () => {
    if (activeTab === 'tendencias') {
      if (isTendenciasLoading) return <p className="text-center text-gray-800">Cargando tendencias...</p>;
      if (tendenciasError) return <p className="text-center text-red-600">Error: {tendenciasError}</p>;
      
      // Pasar los datos reales al componente CardsTendencias
      return <CardsTendencias tendencias={tendenciasData} />; 
    }

    if (activeTab === 'perfil') {
      if (isPerfilLoading) return <p className="text-center text-gray-800">Cargando perfil...</p>;
      if (perfilError) return <p className="text-center text-red-600">Error: {perfilError}</p>;
      if (!perfilData) return <p className="text-center text-gray-800">No se encontraron datos de perfil.</p>;

      // Pasar los datos reales al componente Perfil
      return <Perfil userData={perfilData} />; 
    }

       if (activeTab === 'nuevo') {
      return <FormTurno />;
    }

    if (activeTab === 'historial') {
      return <Historial />;
    }
    
    return null;
  };



  return (
    <>
      {/* 🔹 Barra de pestañas */}
      <div className="flex bg-gray-500 m-auto h-10 text-xs justify-around items-end w-full sm:text-sm md:text-[1rem] lg:text-lg">
        {[
          { id: 'tendencias', label: 'Tendencias' },
          { id: 'perfil', label: 'Mi Perfil' },
          { id: 'nuevo', label: 'Turno' },
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
      <div className="bg-gray-300 p-4 min-h-[400px] place-items-center grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {renderContent()}
      </div>
    </>
  )
}
