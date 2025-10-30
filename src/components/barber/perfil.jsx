import React, { useState, useEffect } from 'react'

export default function Perfil() {
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    especialidad: '',
    experiencia: '',
    bio: '',
    foto: '',
    horario: '',
    rating: 0
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simular petición a la API (en el futuro vendrá de la base de datos)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        // Simular delay de la API
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Datos mock - reemplazar con tu API real
        const mockUserData = {
          nombre: 'Carlos Rodríguez',
          edad: '32 años',
          email: 'carlos@barberiamaster.com',
          telefono: '+1 234 567 8900',
          especialidad: 'Cortes Clásicos y Barbas',
          experiencia: '8 años',
          bio: 'Especializado en cortes clásicos y técnicas modernas de barbería. Apasionado por crear estilos que reflejen la personalidad de cada cliente.',
          foto: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          horario: 'Lun-Vie: 9:00 AM - 7:00 PM',
          rating: 4.8
        }
        
        setUserData(mockUserData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Aquí iría la petición PUT/PATCH para actualizar en la base de datos
    console.log('Guardando datos:', userData)
    setIsEditing(false)
    // Simular guardado exitoso
    alert('Perfil actualizado correctamente')
  }

  const handleCancel = () => {
    // Recargar datos originales (en una app real, harías nueva petición o mantendrías copia)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    )
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
                src={userData.foto}
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
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-2xl ${
                      i < Math.floor(userData.rating) 
                        ? 'text-amber-500' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  {userData.rating}/5.0
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Rating promedio</p>
            </div>

            {/* Información del perfil */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          name="nombre"
                          value={userData.nombre}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-900 font-medium">{userData.nombre}</p>
                      )}
                    </div>

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
                          value={userData.especialidad}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.especialidad}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Experiencia
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="experiencia"
                          value={userData.experiencia}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.experiencia}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Horario
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="horario"
                          value={userData.horario}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-600">{userData.horario}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Biografía
                      </label>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={userData.bio}
                          onChange={handleInputChange}
                          rows="4"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      ) : (
                        <p className="text-gray-600 leading-relaxed">{userData.bio}</p>
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
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Clientes Atendidos', value: '1,234', icon: '👥' },
            { label: 'Años Experiencia', value: '8', icon: '⭐' },
            { label: 'Rating Promedio', value: '4.8', icon: '🎯' },
            { label: 'Servicios', value: '45', icon: '✂️' },
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