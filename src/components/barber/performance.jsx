import React, { useState, useEffect } from 'react'

export default function Performance() {
  // Estados para los datos que vendrán de la base de datos
  const [performanceData, setPerformanceData] = useState({
    diasTrabajados: 0,
    horasTotales: 0,
    sueldoMensual: 0,
    horasExtras: 0,
    clientesAtendidos: 0,
    propinas: 0
  })

  const [isClockedIn, setIsClockedIn] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Simular datos de la base de datos (en el futuro vendrán de una API)
  useEffect(() => {
    // Esto será reemplazado por una llamada a la API
    const mockData = {
      diasTrabajados: 18,
      horasTotales: 144,
      sueldoMensual: 1800,
      horasExtras: 12,
      clientesAtendidos: 156,
      propinas: 320
    }
    setPerformanceData(mockData)
  }, [])

  // Actualizar la hora actual cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleClockInOut = () => {
    setIsClockedIn(!isClockedIn)
    // Aquí se enviaría a la base de datos el registro de entrada/salida
    console.log(isClockedIn ? 'Registro de salida' : 'Registro de entrada')
  }

  // Calcular métricas adicionales
  const promedioClientesPorDia = performanceData.diasTrabajados > 0 
    ? (performanceData.clientesAtendidos / performanceData.diasTrabajados).toFixed(1)
    : 0

  const promedioPropinasPorCliente = performanceData.clientesAtendidos > 0
    ? (performanceData.propinas / performanceData.clientesAtendidos).toFixed(2)
    : 0

  return (
    <div className="p-2 max-w-200 mx-auto">

      {/* Tarjeta de Registro de Entrada/Salida */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border-l-4 border-gray-950">
        <div className="justify-between items-center gap-4  flex flex-col">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Registro de Asistencia</h2>
            <p className="text-gray-600 text-sm">
              {currentTime.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-lg font-medium text-gray-700 mt-1">
              Hora actual: {currentTime.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <button
            onClick={handleClockInOut}
            className={`px-2 py-1 rounded-lg font-semibold text-white transition-all duration-300 ${
              isClockedIn 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isClockedIn ? '🔴 Marcar Salida' : '🟢 Marcar Entrada'}
          </button>
        </div>
        {isClockedIn && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              Registrado desde: {currentTime.toLocaleTimeString('es-ES')}
            </p>
          </div>
        )}
      </div>

      {/* Grid de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Días Trabajados */}
        <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-gray-950">
          
            <div>
              <p className="text-gray-600 text-sm">Días Trabajados</p>
              <p className="text-3xl font-bold text-gray-800">{performanceData.diasTrabajados}</p>
            </div>
          
          <p className="text-gray-500 text-sm mt-2">Este mes</p>
        </div>

        {/* Horas Totales */}
        <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-gray-950">
          
            <div>
              <p className="text-gray-600 text-sm">Horas Totales</p>
              <p className="text-3xl font-bold text-gray-800">{performanceData.horasTotales}h</p>
            </div>
            
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Horas extras:</span>
            <span className="font-semibold text-orange-600">{performanceData.horasExtras}h</span>
          </div>
        </div>


        {/* Sueldo Mensual */}
        <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-gray-950">
         
            <div>
              <p className="text-gray-600 text-sm">Sueldo Mensual</p>
              <p className="text-3xl font-bold text-gray-800">${performanceData.sueldoMensual}</p>
            </div>
         
          <p className="text-gray-500 text-sm mt-2">Estimado</p>
        </div>
      </div>

      {/* Grid de Métricas Secundarias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clientes Atendidos */}
        <div className="bg-white rounded-xl shadow-lg p-4 border-t-4 border-gray-950">
         
            <h3 className="text-lg font-semibold text-gray-800">Clientes Atendidos</h3>
 
          <p className="text-4xl font-bold text-gray-800 mb-2">{performanceData.clientesAtendidos}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Promedio por día:</span>
            <span className="font-semibold">{promedioClientesPorDia} clientes</span>
          </div>
        </div>

        {/* Propinas */}
        <div className="bg-white rounded-xl  shadow-lg p-4 border-t-4 border-gray-950">
          
            <h3 className="text-lg font-semibold text-gray-800">Propinas</h3>
  
          <p className="text-4xl font-bold text-gray-800 mb-2">${performanceData.propinas}</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Promedio por cliente:</span>
            <span className="font-semibold">${promedioPropinasPorCliente}</span>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-800 mb-2"> Próximas Mejoras</h3>
        <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
          <li>Gráficos de rendimiento semanal</li>
          <li>Comparativa con meses anteriores</li>
          <li>Metas y objetivos personales</li>
          <li>Historial de registros completos</li>
        </ul>
      </div>
    </div>
  )
}