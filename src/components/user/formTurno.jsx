import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function FormTurno() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    barbero: '',
    servicio: ''
  })

  const barberos = [
    { id: 1, nombre: 'Jaimito', especialidad: 'Cortes Clásicos' },
    { id: 2, nombre: 'Pepito', especialidad: 'Barbas y Degradados' },
    { id: 3, nombre: 'Fulanito', especialidad: 'Estilos Modernos' }
  ]

  const servicios = [
    'Corte de Cabello',
    'Corte y Barba',
    'Arreglo de Barba',
    'Afeitado Clásico',
    'Tinte y Color'
  ]

  const horariosDisponibles = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la reserva
    console.log('Reserva enviada:', formData)
    alert('¡Turno reservado exitosamente!')
    navigate('/mis-turnos') // Redirigir a la página de turnos
  }

  return (

    <>
      {/* Header */}
      <div className='text-center mb-6'>

        <p className='text-gray-800 text-2xl'>
          Elige tu barbero y horario preferido
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Servicio */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Servicio
          </label>
          <select
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
            required
          >
            <option value="">Selecciona un servicio</option>
            {servicios.map((servicio, index) => (
              <option key={index} value={servicio}>{servicio}</option>
            ))}
          </select>
        </div>

        {/* Barbero */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Barbero <em className='text-gray-600 text-xs'>(Ademas de la especialidad, todos realizan cortes clásicos.)</em>
          </label>
          <select
            name="barbero"
            value={formData.barbero}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
            required
          >
            <option value="">Selecciona un barbero</option>
            {barberos.map(barbero => (
              <option key={barbero.id} value={barbero.nombre}>
                {barbero.nombre} - {barbero.especialidad}
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
            className='w-full px-3 py-2 border border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
            required
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
            className='w-full px-3 py-2 border-amber-400 bg-amber-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500'
            required
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
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200'
          >
            Cancelar
          </button>
          <button
            type="submit"
            className='flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition duration-200'
          >
            Reservar Turno
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