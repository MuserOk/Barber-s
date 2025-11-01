// src/components/user/perfil.jsx (Modificado)

import React, { useState, useEffect, useCallback } from 'react'
import { useApi } from '../../hooks/useApi'; // <--- Importar useApi

export default function Perfil() {
  // Usar useApi para la carga inicial y para guardar
  const { data: initialData, isLoading: isFetching, error: fetchError, execute: fetchExecute } = useApi();
  const { isLoading: isSaving, error: saveError, execute: saveExecute } = useApi();
  
  // Estado local para la edición
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Cargar datos del cliente al montar
  const loadUserData = useCallback(async () => {
      const result = await fetchExecute('get', '/user/perfil');
      if (result.success) {
          // Mapear los nombres de la DB a los nombres del frontend si es necesario
          const mappedData = {
              nombre: result.data.nombre_completo,
              edad: result.data.edad,
              email: result.data.email,
              telefono: result.data.telefono,
              puntos: result.data.puntos_fidelidad,
              miembroDesde: result.data.miembro_desde, // Asumiendo que el backend lo formatea o lo manejamos aquí
              // ... otros campos
          };
          setUserData(mappedData);
      }
  }, [fetchExecute]);

  useEffect(() => {
      loadUserData();
  }, [loadUserData]);

  // Sincronizar el estado local con los datos iniciales cuando se cancela la edición
  const handleCancel = () => {
    // Recargar los datos originales (o usar una copia guardada)
    loadUserData(); 
    setIsEditing(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    // 1. Preparar los datos para el backend (usando nombres de la DB)
    const dataToUpdate = {
        nombre_completo: userData.nombre,
        edad: userData.edad,
        email: userData.email,
        telefono: userData.telefono,
        // No enviamos puntos ni miembroDesde, ya que son de solo lectura
    };
    
    // 2. Llamar a la API de actualización (PUT /api/user/perfil)
    const result = await saveExecute('put', '/user/perfil', dataToUpdate); 

    if (result.success) {
        alert('✅ Perfil actualizado correctamente');
        setIsEditing(false);
    } else {
        alert(`❌ Error al guardar: ${result.error}`);
    }
  }
  
  // Manejo de Carga y Error
  if (isFetching || !userData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gray-300 text-gray-800">
        <p className="text-xl font-semibold">Cargando perfil de cliente...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-[400px] p-4 bg-red-100 border border-red-400 text-red-700">
        <p className="font-bold">Error de Carga:</p>
        <p>{fetchError}</p>
      </div>
    );
  }

  // Calcular puntos restantes para el beneficio
  const puntosRestantes = 250 - userData.puntos;
  const miembroDesdeDisplay = userData.miembroDesde ? new Date(userData.miembroDesde).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';


  return (

    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isSaving}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${isEditing
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
            } disabled:opacity-50`}
        >
          {isSaving ? 'Guardando...' : isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>
      
      {/* Mensaje de Error de Guardado */}
      {saveError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error al guardar:</strong>
              <span className="block sm:inline"> {saveError}</span>
          </div>
      )}

      {/* Tarjeta de puntos */}
      <div className="bg-linear-to-r from-amber-400 to-orange-500 rounded-lg p-4 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Tus Puntos</p>
            <p className="text-3xl font-bold">{userData.puntos} pts</p>
          </div>
          <div className="text-2xl">🎯</div>
        </div>
        <p className="text-sm opacity-90 mt-2">
          Canjea tus puntos por beneficios exclusivos
        </p>
      </div>

      {/* Información del usuario */}
      <div className="space-y-4 flex flex-col">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre completo
          </label>
          {isEditing ? (
            <input
              type="text"
              name="nombre"
              value={userData.nombre}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              disabled={isSaving}
            />
          ) : (
            <p className="text-gray-900 font-medium text-lg">{userData.nombre}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Edad
            </label>
            {isEditing ? (
              <input
                type="text"
                name="edad"
                value={userData.edad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-600">{userData.edad}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Miembro desde
            </label>
            <p className="text-gray-600">{miembroDesdeDisplay}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-600">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="telefono"
                value={userData.telefono}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                disabled={isSaving}
              />
            ) : (
              <p className="text-gray-600">{userData.telefono}</p>
            )}
          </div>
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Próximos beneficios</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            Con {Math.max(0, puntosRestantes)} puntos más obtendrás un 20% de descuento en tu próximo corte
          </p>
        </div>
      </div>
      
      {isEditing && (
          <div className="flex justify-center mt-4">
              <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50"
              >
                  Cancelar Edición
              </button>
          </div>
      )}
    </>

  )
}