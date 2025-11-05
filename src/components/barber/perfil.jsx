// src/components/barber/perfil.jsx (Modificado)

import React, { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'; // <--- Importar useApi

// Recibe los datos iniciales como prop desde BarberPage
export default function Perfil({ initialData }) {
  const { isLoading: isSaving, error: saveError, execute } = useApi(); // Usar useApi para guardar

  
  // Usamos los datos pasados como prop para el estado inicial
  // Creamos una copia profunda para que la edición no afecte la prop original
  const [userData, setUserData] = useState(initialData || {});
  const [isEditing, setIsEditing] = useState(false)




  // 2. **SINCRONIZACIÓN Y NORMALIZACIÓN DE DATOS (CRUCIAL):**
  useEffect(() => {
    // Solo actualiza si initialData tiene un valor real (no null/undefined)
    if (initialData && Object.keys(initialData).length > 0) {
      setUserData({
        ...initialData,
        
        // Asegurar que details no sea null/undefined para evitar errores
        details: initialData.barberDetails || {
          especialidad: '',
          experiencia_anios: '',
          biografia: '',
          horario_laboral: ''
        },
         
        // Asegurar que campos clave de USUARIOS no sean null/undefined
        nombre_completo: initialData.nombre_completo || '',
        email: initialData.email || '',
        telefono: initialData.telefono || '',
        edad: initialData.edad || '',
      });
    }
  }, [initialData]); // Depende de initialData


  // Sincronizar el estado local si la prop cambia (aunque no debería)
  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);

  const details = userData.barberDetails || {};
  const rating = userData.barberDetails.rating_promedio || 0;
  const experienciaAnios = userData.barberDetails.experiencia_anios || '';
  const bio = userData.barberDetails.biografia || '';
  const horario = userData.barberDetails.horario_laboral || '';
  const especialidad = userData.barberDetails.especialidad || '';

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Lógica para manejar campos anidados (details)
    if (['especialidad', 'experiencia', 'bio', 'horario'].includes(name)) {
      // Mapear 'experiencia' a 'experiencia_anios' y 'bio' a 'biografia'
      const dbName = name === 'experiencia' ? 'experiencia_anios' : name === 'bio' ? 'biografia' : name === 'horario' ? 'horario_laboral' : name;

      // convertir a int
      const finalValue = name === 'experiencia' ? (value === '' ? '' : parseInt(value, 10)) : value;


      setUserData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [dbName]: finalValue
        }
      }));
    } else {
      // Campos directos de USUARIOS
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  const handleSave = async () => {
    // 1. Preparar los datos para la actualización (solo los campos editables)
    const dataToUpdate = {
      nombre_completo: userData.nombre_completo,
      email: userData.email,
      telefono: userData.telefono,
      edad: userData.edad,
      // Mapeo de nombres de frontend a nombres de backend
      especialidad: userData.barberDetails.especialidad,
      experiencia_anios: userData.barberDetails.experiencia_anios,
      biografia: userData.barberDetails.biografia,
      horario_laboral: userData.barberDetails.horario_laboral,
    };

    // 2. Llamar a la API de actualización (PUT /api/user/perfil)
    const result = await execute('put', '/user/perfil', dataToUpdate);

    if (result.success) {
      alert('✅ Perfil actualizado correctamente');
      setIsEditing(false);
      // Nota: El estado userData ya tiene los cambios locales, no es necesario recargar
    } else {
      alert(`❌ Error al guardar: ${result.error}`);
    }
  }

  const handleCancel = () => {
    // Restaurar los datos originales (la prop initialData)
    setUserData(initialData);
    setIsEditing(false);
  }


  return (
    <>
      {/* Header */}

      <p className="text-gray-900 mt-2 text-lg lg:font-medium">Gestiona tu información personal y profesional</p>


      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Banner superior */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 h-32"></div>

        <div className="relative px-6 pb-6">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center -mt-16 mb-6">
            <img
              // Usar la foto real del backend si existe, sino un placeholder
              src={userData.foto_perfil_url || 'https://estados-unidos.info/wp-content/uploads/2023/10/barbero-1.png'}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isEditing && (
              <button className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium">
                Cambiar foto
              </button>
            )}
          </div>

          {/* Rating */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center ">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${i < Math.floor(rating)
                    ? 'text-amber-500'
                    : 'text-gray-300'
                    }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-lg font-semibold text-gray-700">
                {rating}/5.0
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Rating promedio</p>
          </div>

          {/* Información del perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
            {/* Columna izquierda - Información personal */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Información Personal
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="nombre_completo" // <--- Nombre de la DB
                        value={userData.nombre_completo}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{userData.nombre_completo}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Edad
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="edad"
                        value={userData.edad}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-600">{userData.edad}</p>
                    )}
                  </div>

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
                      />
                    ) : (
                      <p className="text-gray-600">{userData.telefono}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Información profesional */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                  Información Profesional
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especialidad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="especialidad"
                        value={details.especialidad}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-600">{details.especialidad}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Experiencia (Años)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="Experiencia" // Mapeado a experiencia_anios en handleInputChange
                        value={Number}
                        onChange={handleInputChange}
                        className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-600">{experienciaAnios}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horario
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="horario" // Mapeado a horario_laboral en handleInputChange
                        value={horario}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-600">{horario}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biografía
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio" // Mapeado a biografia en handleInputChange
                        value={bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed">{bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center space-x-4 mt-8 pt-6 border-t">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
              >
                Editar Perfil
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                >
                  Cancelar
                </button>
              </>
            )}
          </div>
          {saveError && (
            <p className="text-red-500 text-center mt-4">Error al guardar: {saveError}</p>
          )}
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Clientes Atendidos', value: '~ 20', icon: '👥' }, // VER COMO Y DE DONDE CALCULAR
          { label: 'Años Experiencia', value: experienciaAnios, icon: '⭐' },
          { label: 'Rating Promedio', value: rating, icon: '🎯' },
          { label: 'Servicios', value: especialidad, icon: '✂️' },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </>

  )
}