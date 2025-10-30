import React, { useState, useEffect } from 'react'

export default function Perfil() {
  const [userData, setUserData] = useState({
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    puntos: 0,
    miembroDesde: ''
  })

  const [isEditing, setIsEditing] = useState(false)

  // Simular petición a la API
  useEffect(() => {
    // Esto será reemplazado por tu petición real
    const mockData = {
      nombre: 'Juan Pérez',
      edad: '28 años',
      email: 'juan.perez@email.com',
      telefono: '+1 234 567 8900',
      puntos: 150,
      miembroDesde: 'Enero 2024'
    }
    setUserData(mockData)
  }, [])

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (

    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleEdit}
          className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${isEditing
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-amber-500 hover:bg-amber-600 text-white'
            }`}
        >
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>

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
              />
            ) : (
              <p className="text-gray-600">{userData.edad}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Miembro desde
            </label>
            <p className="text-gray-600">{userData.miembroDesde}</p>
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

      {/* Información adicional */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Próximos beneficios</h3>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm">
            Con {250 - userData.puntos} puntos más obtendrás un 20% de descuento en tu próximo corte
          </p>
        </div>
      </div>
    </>

  )
}