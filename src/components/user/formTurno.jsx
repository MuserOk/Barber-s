// src/components/user/formTurno.jsx (Modificado)

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useApi } from '../../hooks/useApi' // <--- Importar useApi

export default function FormTurno() {
  const navigate = useNavigate();
  const { isLoading, error, execute } = useApi(); // <--- Usar useApi

  // Estados para datos dinámicos del backend
  const [barberos, setBarberos] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]); // Se llenará dinámicamente

  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    id_barbero: '', // Cambiado a id_barbero para el backend
    id_servicio: '' // Cambiado a id_servicio para el backend
  })

  // Hook para cargar barberos y servicios al inicio
  useEffect(() => {
    const loadInitialData = async () => {
      // 1. Cargar Servicios
      const serviceResult = await execute('get', '/user/servicios'); // Asumimos que crearemos esta ruta
      if (serviceResult.success) {
        setServicios(serviceResult.data);
      }

      // 2. Cargar Barberos
      const barberResult = await execute('get', '/user/barberos'); // Asumimos que crearemos esta ruta
      if (barberResult.success) {
        setBarberos(barberResult.data);
      }
      
      
      // Nota: La carga de horarios disponibles se haría en un useEffect separado
      // que dependa de id_barbero y fecha. Por ahora, usamos un mock.
      setHorariosDisponibles(['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']);
    };
    loadInitialData();
  }, [execute]);


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    
  }

  const handleSubmit = async (e) => { // <--- Hacer la función asíncrona
    e.preventDefault()
    
    // Validación simple
    if (!formData.id_barbero || !formData.id_servicio || !formData.fecha || !formData.hora) {
        alert("Por favor, completa todos los campos de la reserva.");
        return;
    }

    // 1. Ejecutar la petición POST al backend
    const result = await execute('post', '/turnos', formData);

    // 2. Manejar la respuesta
    if (result.success) {
      alert(`✅ ¡Turno reservado exitosamente! Precio: $${result.data.precio}`);
      navigate('/userPage'); // Redirigir a la página de turnos (o perfil)
    } else {
      // Mostrar el mensaje de error que viene del backend (ej: "Barbero no disponible")
      alert(`❌ Error al reservar: ${result.error}`);
    }
  }

  return (

    <>
      {/* Header */}
      <div className='text-center mb-6'>
        <p className='text-gray-800 text-2xl'>
          Elige tu barbero y horario preferido
        </p>
      </div>
      
      {/* Mensaje de Error de API */}
      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error de Reserva:</strong>
              <span className="block sm:inline"> {error}</span>
          </div>
      )}

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Servicio */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Servicio
          </label>
          <select
            name="id_servicio"
            value={formData.id_servicio}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50'
            required
            disabled={isLoading}
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.id_servicio} value={servicio.id_servicio}>
                {servicio.nombre} (${servicio.precio})
              </option>
            ))}
          </select>
        </div>

        {/* Barbero */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Barbero <em className='text-gray-600 text-xs'>(Ademas de la especialidad, todos realizan cortes clásicos.)</em>
          </label>
          <select
            name="id_barbero"
            value={formData.id_barbero}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50'
            required
            disabled={isLoading}
          >
            <option value="">Selecciona un barbero</option>
            {barberos.map(barbero => (
              <option key={barbero.id_barbero} value={barbero.id_barbero}>
                {barbero.nombre_completo} - {barbero.especialidad || 'General'}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Fecha
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50'
            required
            disabled={isLoading}
          />
        </div>

        {/* Hora */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Hora
          </label>
          <select
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            className='w-full px-3 py-2 border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50'
            required
            disabled={isLoading}
          >
            <option value="">Selecciona una hora</option>
            {horariosDisponibles.map((hora, index) => (
              <option key={index} value={hora}>{hora}</option>
            ))}
          </select>
        </div>

        {/* Información adicional */}
        <div className='bg-amber-50 border border-amber-200 rounded-lg p-3'>
          <p className='text-sm text-amber-800'>
            <strong>Recuerda:</strong> Llega 10 minutos antes de tu cita
          </p>
        </div>

        {/* Botones */}
        <div className='flex space-x-3 pt-4'>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50'
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className='flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-200 disabled:opacity-50'
            disabled={isLoading}
          >
            {isLoading ? 'RESERVANDO...' : 'Reservar Turno'}
          </button>
        </div>
      </form>

      {/* Información de contacto */}
      <div className='mt-6 text-center text-sm text-gray-500'>
        <p>¿Necesitas ayuda? Llámanos: +1 234 567 890</p>
      </div>
    </>

  )
}