import React, { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'; // <--- Importar useApi


export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Usar useApi para cargar las métricas
  const { data: metricas, isLoading, error, execute } = useApi();

  // Cargar métricas al montar el componente
  useEffect(() => {
    const loadMetrics = async () => {
      // Llamar a la ruta del dashboard
      await execute('get', '/admin/dashboard');
    };
    loadMetrics();
  }, [execute]);

  // 1. Manejo de Carga y Error
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-semibold text-gray-800">Cargando Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 bg-red-100 border border-red-400 text-red-700">
        <p className="font-bold">Error de Carga del Dashboard:</p>
        <p>{error}</p>
      </div>
    );
  }

  // Si no hay métricas (y no hubo error), puede ser un problema de datos
  const dashboardData = metricas || {};
  



  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Header del Admin */}
      <div className="bg-linear-to-r from-violet-700 to-gray-800 textWhite p-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Panel de Administración</h1>
              <p className="text-blue-100">Gestión completa de la barbería</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Administrador</p>
              <p className="text-blue-200 text-sm">Último acceso: Hoy</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Barra de pestañas mejorada */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {[
              { id: 'dashboard', label: ' Dashboard' },
              { id: 'calendario', label: ' Calendario' },
              { id: 'clientes', label: ' Clientes' },
              { id: 'barberos', label: ' Barberos' },
              { id: 'inventario', label: ' Inventario' },
              { id: 'finanzas', label: ' Finanzas' },
              { id: 'configuracion', label: ' Configuración' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-all duration-200 font-medium whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Contenido dinámico */}
      <div className="max-w-7xl mx-auto p-4 md:p-6">

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Métricas rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Ingresos Hoy</p>
                    <p className="text-2xl font-bold text-gray-800">${dashboardData.ingresosHoy}</p>
                  </div>
                  <div className="text-2xl text-green-500">
                    <svg fill="#37025a" height="28px" width="28px" version="1.1" id="Layer_1" viewBox="0 0 512 512" stroke="#37025a"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M263.802,304.683c-10.339-5.465-24.498-12.95-24.498-18.631c0-9.206,7.49-16.696,16.696-16.696 c9.206,0,16.696,7.49,16.696,16.696c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696 c0-21.766-13.959-40.323-33.391-47.215V230.4c0-9.22-7.475-16.696-16.696-16.696c-9.22,0-16.696,7.475-16.696,16.696v8.437 c-19.433,6.892-33.391,25.45-33.391,47.215c0,25.8,23.445,38.193,42.285,48.151c10.339,5.465,24.498,12.95,24.498,18.631 c0,9.206-7.49,16.696-16.696,16.696c-9.206,0-16.696-7.49-16.696-16.696c0-9.22-7.475-16.696-16.696-16.696 s-16.696,7.475-16.696,16.696c0,21.766,13.959,40.323,33.391,47.215v8.437c0,9.22,7.475,16.696,16.696,16.696 c9.22,0,16.696-7.475,16.696-16.696v-8.437c19.433-6.892,33.391-25.45,33.391-47.215 C306.087,327.034,282.642,314.642,263.802,304.683z"></path> </g> </g> <g> <g> <path d="M155.826,369.53h-55.652V269.357h55.652c9.22,0,16.696-7.475,16.696-16.696c0-9.22-7.475-16.696-16.696-16.696H83.478 c-9.22,0-16.696,7.475-16.696,16.696v133.565c0,9.22,7.475,16.696,16.696,16.696h72.348c9.22,0,16.696-7.475,16.696-16.696 S165.047,369.53,155.826,369.53z"></path> </g> </g> <g> <g> <path d="M428.522,235.965h-72.348c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h55.652V369.53h-55.652 c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h72.348c9.22,0,16.696-7.475,16.696-16.696V252.661 C445.217,243.44,437.742,235.965,428.522,235.965z"></path> </g> </g> <g> <g> <path d="M461.913,38.957H50.087C22.469,38.957,0,61.426,0,89.044c0,4.754,0,327.745,0,333.913 c0,27.618,22.469,50.087,50.087,50.087h411.826c27.618,0,50.087-22.469,50.087-50.087c0-13.605,0-320.13,0-333.913 C512,61.426,489.531,38.957,461.913,38.957z M478.609,422.957c0,9.206-7.49,16.696-16.696,16.696H50.087 c-9.206,0-16.696-7.49-16.696-16.696c0-10.246,0-196.041,0-205.913c0-9.206,7.49-16.696,16.696-16.696h411.826 c9.206,0,16.696,7.49,16.696,16.696C478.609,226.933,478.609,412.832,478.609,422.957z M478.609,169.828 c-5.226-1.853-10.843-2.872-16.696-2.872H50.087c-5.852,0-11.47,1.018-16.696,2.872v-14.002c0-9.206,7.49-16.696,16.696-16.696 h411.826c9.206,0,16.696,7.49,16.696,16.696V169.828z M478.609,108.611c-5.226-1.853-10.843-2.872-16.696-2.872H50.087 c-5.852,0-11.47,1.018-16.696,2.872V89.044c0-9.206,7.49-16.696,16.696-16.696h411.826c9.206,0,16.696,7.49,16.696,16.696V108.611 z"></path> </g> </g> </g></svg>
                  </div>
                </div>
                <p className="text-green-600 text-sm mt-2">↑ 12% vs ayer</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Citas Hoy</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.citasHoy}</p>
                  </div>
                  <div className="text-2xl text-blue-500">
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#331263" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4 C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31 c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8 c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"></path> </g> </g></svg>

                  </div>
                </div>
                <p className="text-blue-600 text-sm mt-2">{dashboardData.citasHoy - 2} completadas</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Clientes Nuevos</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.clientesNuevos}</p>
                  </div>
                  <div className="text-2xl text-purple-500">
                    <svg width="28px" height="28px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 505.6c-108.8 0-204.8-89.6-204.8-204.8S396.8 102.4 512 102.4c108.8 0 204.8 89.6 204.8 204.8S620.8 505.6 512 505.6z m0-358.4c-83.2 0-153.6 70.4-153.6 153.6s64 153.6 153.6 153.6 153.6-70.4 153.6-153.6S595.2 147.2 512 147.2z" fill="#310665"></path><path d="M832 864c0-211.2-147.2-377.6-326.4-377.6s-326.4 166.4-326.4 377.6H832z" fill="#2a2730"></path><path d="M832 889.6H147.2v-25.6c0-224 160-403.2 352-403.2s352 179.2 352 396.8v25.6l-19.2 6.4z m-633.6-51.2h608C800 659.2 665.6 512 505.6 512c-166.4 0-294.4 147.2-307.2 326.4zM710.4 499.2c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c64 0 121.6-51.2 121.6-121.6 0-51.2-32-96-83.2-115.2-12.8-6.4-19.2-19.2-12.8-32 6.4-12.8 19.2-19.2 32-12.8 70.4 19.2 115.2 83.2 115.2 160-6.4 96-83.2 172.8-172.8 172.8z" fill="#310665"></path><path d="M966.4 806.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h32c-12.8-140.8-115.2-249.6-236.8-249.6-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c160 0 288 147.2 288 326.4v25.6h-25.6z" fill="#310665"></path><path d="M300.8 499.2c-6.4 0-6.4 0 0 0-44.8 0-89.6-12.8-121.6-44.8-32-32-44.8-76.8-44.8-121.6 0-70.4 44.8-134.4 115.2-160 12.8-6.4 25.6 0 32 12.8 6.4 12.8 0 25.6-12.8 32-57.6 19.2-89.6 64-89.6 115.2 0 32 12.8 64 32 83.2 19.2 25.6 51.2 32 83.2 38.4 19.2 0 25.6 12.8 25.6 25.6s-6.4 19.2-19.2 19.2z" fill="#310665"></path><path d="M89.6 806.4H12.8v-25.6c0-179.2 128-320 288-320 12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6C179.2 512 76.8 620.8 64 761.6h32c12.8 0 25.6 12.8 25.6 25.6-6.4 6.4-12.8 19.2-32 19.2z" fill="#310665"></path></g></svg>
                  </div>
                </div>
                <p className="text-purple-600 text-sm mt-2">Este mes: {dashboardData.clientesNuevos}</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-amber-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Rating Promedio</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.ratingPromedio}/5</p>
                  </div>
                  <div className="text-2xl text-amber-500">
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#f7f7f7" d="M31.998,2.478c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167l-14.999,15.38l3.541,21.701 l-18.54-10.254l-18.54,10.254l3.541-21.701L2,24.912l20.729-3.167l8.798-18.743C31.527,3.002,31.719,2.478,31.998,2.478 M31.998,0 c-0.775,0-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343 c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957 c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719 c0.302,0.166,0.636,0.25,0.968,0.25c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704 l14.294-14.657c0.523-0.537,0.703-1.321,0.465-2.031c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15 C33.479,0.448,32.773,0,31.998,0L31.998,0z"></path> <path fill="#f5c400" d="M31.998,2.478c0.279,0,0.463,0.509,0.463,0.509l8.806,18.759l20.729,3.167l-14.999,15.38l3.541,21.701 l-18.54-10.254l-18.54,10.254l3.541-21.701L2,24.912l20.729-3.167l8.798-18.743C31.527,3.002,31.719,2.478,31.998,2.478"></path> </g> </g></svg>
                  </div>
                </div>
                <p className="text-amber-600 text-sm mt-2">+0.2 este mes</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Stock Bajo</p>
                    <p className="text-2xl font-bold text-gray-800">{dashboardData.productosStockBajo}</p>
                  </div>
                  <div className="text-2xl text-red-500">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M13.0618 4.4295C12.6211 3.54786 11.3635 3.54786 10.9228 4.4295L3.88996 18.5006C3.49244 19.2959 4.07057 20.2317 4.95945 20.2317H19.0252C19.914 20.2317 20.4922 19.2959 20.0947 18.5006L13.0618 4.4295ZM9.34184 3.6387C10.4339 1.45376 13.5507 1.45377 14.6428 3.63871L21.6756 17.7098C22.6608 19.6809 21.228 22 19.0252 22H4.95945C2.75657 22 1.32382 19.6809 2.30898 17.7098L9.34184 3.6387Z" fill="#f19c09"></path> <path d="M12 8V13" stroke="#f19c09" strokeWidth="1.7" strokeLinecap="round"></path> <path d="M12 16L12 16.5" stroke="#f19c09" strokeWidth="1.7" strokeLinecap="round"></path> </g></svg>
                  </div>
                </div>
                <p className="text-red-600 text-sm mt-2">Reabastecer pronto</p>
              </div>
            </div>

            {/* Gráficos y secciones rápidas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">

             
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Citas de Hoy</h3>
                <div className="space-y-3">
                  {dashboardData.citasHoyDetalle?.map((cita, index) => (
                    // Usar un fondo claro para cada cita
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">{cita.cliente}</p>
                        <p className="text-sm text-gray-600">{new Date(cita.fecha_hora_inicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} - {cita.servicio}</p>
                      </div>
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Confirmada</span>
                    </div>
                  ))}
                  {dashboardData.citasHoyDetalle?.length === 0 && (
                    <p className="text-gray-600 text-center">No hay citas confirmadas para hoy.</p>
                  )}
                </div>
              </div>

              {/* Barberos activos */}
              <div className="bg-gray-500 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">💈 Barberos Activos</h3>
                <div className="space-y-3 text-gray-700">
                  {dashboardData.barberosActivos?.map((barbero, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{barbero.nombre}</span>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded ${barbero.rating > 4.5
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                          }`}>
                          Rating: {barbero.rating}
                        </span>
                        <p className="text-sm text-gray-800">Disponible</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendario' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#331263" d="M60,4h-7V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H17V3c0-1.657-1.343-3-3-3s-3,1.343-3,3v1H4 C1.789,4,0,5.789,0,8v52c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M18,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M18,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M18,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M30,53c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M30,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M30,31 c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M42,53c0,0.553-0.447,1-1,1h-6 c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V53z M42,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5 c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M42,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6 c0.553,0,1,0.447,1,1V31z M54,42c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V42z M54,31c0,0.553-0.447,1-1,1h-6c-0.553,0-1-0.447-1-1v-5c0-0.553,0.447-1,1-1h6c0.553,0,1,0.447,1,1V31z M62,15H2V8 c0-1.104,0.896-2,2-2h7v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h30v4c0,1.657,1.343,3,3,3s3-1.343,3-3V6h7c1.104,0,2,0.896,2,2V15z"></path> </g> </g></svg>

              Calendario General</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">

              </div>
              <h3 className="text-xl font-semibold text-gray-700">Vista de Calendario</h3>
              <p className="text-gray-500 mt-2">Aquí irá el calendario completo con todas las citas</p>
            </div>
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg width="28px" height="28px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 505.6c-108.8 0-204.8-89.6-204.8-204.8S396.8 102.4 512 102.4c108.8 0 204.8 89.6 204.8 204.8S620.8 505.6 512 505.6z m0-358.4c-83.2 0-153.6 70.4-153.6 153.6s64 153.6 153.6 153.6 153.6-70.4 153.6-153.6S595.2 147.2 512 147.2z" fill="#310665"></path><path d="M832 864c0-211.2-147.2-377.6-326.4-377.6s-326.4 166.4-326.4 377.6H832z" fill="#2a2730"></path><path d="M832 889.6H147.2v-25.6c0-224 160-403.2 352-403.2s352 179.2 352 396.8v25.6l-19.2 6.4z m-633.6-51.2h608C800 659.2 665.6 512 505.6 512c-166.4 0-294.4 147.2-307.2 326.4zM710.4 499.2c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c64 0 121.6-51.2 121.6-121.6 0-51.2-32-96-83.2-115.2-12.8-6.4-19.2-19.2-12.8-32 6.4-12.8 19.2-19.2 32-12.8 70.4 19.2 115.2 83.2 115.2 160-6.4 96-83.2 172.8-172.8 172.8z" fill="#310665"></path><path d="M966.4 806.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h32c-12.8-140.8-115.2-249.6-236.8-249.6-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6c160 0 288 147.2 288 326.4v25.6h-25.6z" fill="#310665"></path><path d="M300.8 499.2c-6.4 0-6.4 0 0 0-44.8 0-89.6-12.8-121.6-44.8-32-32-44.8-76.8-44.8-121.6 0-70.4 44.8-134.4 115.2-160 12.8-6.4 25.6 0 32 12.8 6.4 12.8 0 25.6-12.8 32-57.6 19.2-89.6 64-89.6 115.2 0 32 12.8 64 32 83.2 19.2 25.6 51.2 32 83.2 38.4 19.2 0 25.6 12.8 25.6 25.6s-6.4 19.2-19.2 19.2z" fill="#310665"></path><path d="M89.6 806.4H12.8v-25.6c0-179.2 128-320 288-320 12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6C179.2 512 76.8 620.8 64 761.6h32c12.8 0 25.6 12.8 25.6 25.6-6.4 6.4-12.8 19.2-32 19.2z" fill="#310665"></path></g></svg>

              Gestión de Clientes</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">

              </div>
              <h3 className="text-xl font-semibold text-gray-700">Base de Clientes</h3>
              <p className="text-gray-500 mt-2">Lista completa de clientes y su historial</p>
            </div>
          </div>
        )}

        {activeTab === 'barberos' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg fill="#28282f" height="28px" width="28px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001" stroke="#28282f"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <circle cx="300.835" cy="381.397" r="8.501"></circle> </g> </g> <g> <g> <path d="M403.227,494.999h-13.141v-5.766c0-12.795-10.409-23.205-23.205-23.205c-17.321,0-31.414-14.093-31.414-31.414V352.51 c0-4.672-3.769-8.46-8.432-8.497v-38.625h22.628l12.76,37.035c0.955,2.77,3.27,4.854,6.126,5.513l31.936,7.367 c0.643,0.148,1.285,0.22,1.918,0.22c3.87,0,7.368-2.661,8.275-6.592c1.056-4.574-1.798-9.139-6.372-10.193l-27.345-6.309 l-9.317-27.04h9.244c18.751,0,34.007-15.256,34.007-34.007s-15.256-34.007-34.007-34.007h-64.666v-30.716h14.333 c14.375,0,26.069-11.693,26.069-26.069c0-14.375-11.693-26.069-26.069-26.069H172.234l-8.218-54.082 c-1.714-11.27-10.442-19.76-21.07-21.719l-1.916-12.606c9.565-5.028,15.379-15.73,13.667-26.999l-2.577-16.957 c-1.046-6.884-4.711-12.949-10.319-17.077c-5.607-4.128-12.485-5.825-19.372-4.78c-14.209,2.163-24.014,15.482-21.855,29.691 l2.576,16.958c1.713,11.27,10.443,19.767,21.071,21.724l1.915,12.61c-3.46,1.812-6.505,4.377-8.888,7.615 c-4.129,5.607-5.826,12.487-4.78,19.371l17.792,117.083c1.046,6.884,4.711,12.949,10.319,17.077 c3.293,2.423,7.025,3.998,10.936,4.682l1.494,3.722c6.489,16.177,21.201,27.099,38.254,28.805 c3.701,14.772,17.085,25.747,32.987,25.747h50.368v38.625c-4.663,0.037-8.432,3.825-8.432,8.497v17.556h-27.017 c-2.138,0-4.196,0.805-5.766,2.254l-29.469,27.202c-3.45,3.185-3.664,8.562-0.481,12.012c1.676,1.816,3.958,2.735,6.249,2.735 c2.061,0,4.13-0.746,5.763-2.254l27.028-24.948h23.693v47.548c0,17.321-14.093,31.414-31.414,31.414 c-12.795,0-23.205,10.409-23.205,23.205v5.766h-13.141c-4.696,0-8.501,3.805-8.501,8.501c0,4.696,3.805,8.501,8.501,8.501h21.642 h161.513h21.642c4.696,0,8.501-3.805,8.501-8.501C411.725,498.804,407.921,494.999,403.227,494.999z M326.558,171.523 c5,0,9.067,4.068,9.067,9.067s-4.068,9.067-9.067,9.067H177.575l-2.756-18.135H326.558z M119.959,44.396l-2.576-16.958 c-0.751-4.942,2.66-9.575,7.602-10.327c2.393-0.37,4.786,0.227,6.737,1.663s3.225,3.545,3.588,5.94l2.577,16.957 c0.751,4.943-2.659,9.576-7.602,10.327C125.349,52.74,120.71,49.337,119.959,44.396z M163.338,226.814 c-1.436,1.951-3.544,3.225-5.939,3.588c-2.396,0.365-4.788-0.228-6.737-1.663c-1.951-1.436-3.225-3.545-3.588-5.94L129.28,105.717 c-0.364-2.394,0.226-4.788,1.662-6.737c1.437-1.951,3.545-3.225,5.94-3.588c0.461-0.071,0.923-0.105,1.382-0.105 c1.918,0,3.781,0.609,5.357,1.768c1.951,1.436,3.225,3.545,3.588,5.939l17.792,117.083 C165.364,222.47,164.775,224.864,163.338,226.814z M191.422,262.53c-2.079-0.321-4.093-0.862-6.017-1.602l-13.43-10.522 c-1.262-1.81-2.335-3.783-3.184-5.901l-0.114-0.286c3.238-1.794,6.093-4.257,8.354-7.328c4.128-5.607,5.825-12.487,4.779-19.371 l-1.651-10.863h115.065v30.715h-70.969C208.564,237.373,195.328,248.057,191.422,262.53z M224.255,288.386 c-9.379,0-17.007-7.628-17.007-17.006c0-9.377,7.628-17.006,17.006-17.006h152.637c9.377,0,17.006,7.628,17.006,17.006 s-7.628,17.006-17.006,17.006h-58.354h-35.413H224.255z M310.034,305.388v38.621h-18.411v-38.621H310.034z M373.086,494.999 H228.573v-5.766c0-3.421,2.783-6.203,6.203-6.203c26.697,0,48.415-21.719,48.415-48.415v-73.604h35.276v73.604 c0,26.697,21.719,48.415,48.415,48.415c3.421,0,6.203,2.783,6.203,6.203V494.999z"></path> </g> </g> </g></svg>

              Gestión de Barberos</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">

              <h3 className="text-xl font-semibold text-gray-700">Equipo de Barberos</h3>
              <p className="text-gray-500 mt-2">Horarios, rendimiento y gestión del personal</p>
            </div>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg fill="#2e2d2d" height="28px" width="28px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" stroke="#2e2d2d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M438.052,141.469c4.329,0,7.837-3.508,7.837-7.837V68.723c0-26.756-21.768-48.524-48.525-48.524H290.442 C283.668,8.156,270.772,0,255.999,0c-14.773,0-27.669,8.156-34.443,20.198H114.635c-26.757,0-48.525,21.768-48.525,48.524v394.742 c0,26.762,21.768,48.536,48.525,48.536h282.728c26.757,0,48.525-21.774,48.525-48.536V167.832c0-4.329-3.508-7.837-7.837-7.837 s-7.837,3.508-7.837,7.837v295.633c0,18.121-14.737,32.862-32.852,32.862H114.635c-18.114,0-32.852-14.741-32.852-32.862V68.723 c0-18.114,14.737-32.851,32.852-32.851h102.039c-0.11,1.195-0.173,2.403-0.173,3.627v5.862h-15.503 c-15.848,0-28.741,12.894-28.741,28.742v1.319h-37.184c-11.281,0-20.458,9.173-20.458,20.449v144.624 c0,4.329,3.508,7.837,7.837,7.837c4.329,0,7.837-3.508,7.837-7.837V95.869c0-2.634,2.146-4.775,4.785-4.775h37.185v8.782 c0,4.329,3.508,7.837,7.837,7.837h151.81c4.329,0,7.837-3.508,7.837-7.837v-8.782h37.185c2.638,0,4.785,2.142,4.785,4.775v351.41 c0,2.634-2.146,4.775-4.785,4.775H135.073c-2.638,0-4.785-2.142-4.785-4.775v-170.58c0-4.329-3.508-7.837-7.837-7.837 c-4.329,0-7.837,3.508-7.837,7.837v170.58c0,11.276,9.177,20.449,20.458,20.449h241.852c11.281,0,20.458-9.173,20.458-20.449 V95.869c0-11.275-9.177-20.449-20.458-20.449h-37.185v-1.319c0-15.848-12.893-28.742-28.741-28.742h-15.503v-5.862 c0-1.224-0.064-2.432-0.173-3.627h102.04c18.114,0,32.852,14.737,32.852,32.851v64.909 C430.215,137.96,433.724,141.469,438.052,141.469z M232.175,39.498c0-13.136,10.688-23.825,23.825-23.825 c13.136,0,23.825,10.688,23.825,23.825v5.862h-47.649V39.498z M311,61.034c7.206,0,13.069,5.862,13.069,13.069V92.04H187.931 V74.102c0-7.206,5.862-13.069,13.068-13.069H311z"></path> </g> </g> <g> <g> <path d="M179.43,159.992c-15.288,0-27.725,12.437-27.725,27.726s12.437,27.726,27.725,27.726 c15.289,0,27.726-12.437,27.726-27.726S194.719,159.992,179.43,159.992z M179.43,199.77c-6.646,0-12.052-5.407-12.052-12.053 s5.405-12.053,12.052-12.053c6.646,0,12.053,5.407,12.053,12.053S186.076,199.77,179.43,199.77z"></path> </g> </g> <g> <g> <path d="M179.43,243.85c-15.288,0-27.725,12.437-27.725,27.726s12.437,27.726,27.725,27.726c15.289,0,27.726-12.437,27.726-27.726 C207.157,256.287,194.719,243.85,179.43,243.85z M179.43,283.629c-6.646,0-12.052-5.407-12.052-12.053s5.405-12.053,12.052-12.053 c6.646,0,12.053,5.407,12.053,12.053C191.483,278.222,186.076,283.629,179.43,283.629z"></path> </g> </g> <g> <g> <path d="M179.43,327.71c-15.288,0-27.725,12.437-27.725,27.725c0,15.289,12.437,27.726,27.725,27.726 c15.289,0,27.726-12.437,27.726-27.726C207.157,340.148,194.719,327.71,179.43,327.71z M179.43,367.489 c-6.646,0-12.052-5.407-12.052-12.053s5.405-12.052,12.052-12.052c6.646,0,12.053,5.406,12.053,12.052 C191.483,362.081,186.076,367.489,179.43,367.489z"></path> </g> </g> <g> <g> <path d="M340.023,179.88H237.328c-4.329,0-7.837,3.508-7.837,7.837c0,4.329,3.508,7.837,7.837,7.837h102.695 c4.329,0,7.837-3.508,7.837-7.837C347.86,183.388,344.352,179.88,340.023,179.88z"></path> </g> </g> <g> <g> <path d="M340.023,263.74H237.328c-4.329,0-7.837,3.508-7.837,7.837c0,4.329,3.508,7.837,7.837,7.837h102.695 c4.329,0,7.837-3.508,7.837-7.837C347.86,267.247,344.352,263.74,340.023,263.74z"></path> </g> </g> <g> <g> <path d="M340.023,347.599H237.328c-4.329,0-7.837,3.508-7.837,7.837c0,4.329,3.508,7.837,7.837,7.837h102.695 c4.329,0,7.837-3.508,7.837-7.837C347.86,351.107,344.352,347.599,340.023,347.599z"></path> </g> </g> </g></svg>
              Control de Inventario</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700">Gestión de Productos</h3>
              <p className="text-gray-500 mt-2">Stock, pedidos y control de productos</p>
            </div>
          </div>
        )}

        {activeTab === 'finanzas' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg fill="#37025a" height="28px" width="28px" version="1.1" id="Layer_1" viewBox="0 0 512 512" stroke="#37025a"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M263.802,304.683c-10.339-5.465-24.498-12.95-24.498-18.631c0-9.206,7.49-16.696,16.696-16.696 c9.206,0,16.696,7.49,16.696,16.696c0,9.22,7.475,16.696,16.696,16.696s16.696-7.475,16.696-16.696 c0-21.766-13.959-40.323-33.391-47.215V230.4c0-9.22-7.475-16.696-16.696-16.696c-9.22,0-16.696,7.475-16.696,16.696v8.437 c-19.433,6.892-33.391,25.45-33.391,47.215c0,25.8,23.445,38.193,42.285,48.151c10.339,5.465,24.498,12.95,24.498,18.631 c0,9.206-7.49,16.696-16.696,16.696c-9.206,0-16.696-7.49-16.696-16.696c0-9.22-7.475-16.696-16.696-16.696 s-16.696,7.475-16.696,16.696c0,21.766,13.959,40.323,33.391,47.215v8.437c0,9.22,7.475,16.696,16.696,16.696 c9.22,0,16.696-7.475,16.696-16.696v-8.437c19.433-6.892,33.391-25.45,33.391-47.215 C306.087,327.034,282.642,314.642,263.802,304.683z"></path> </g> </g> <g> <g> <path d="M155.826,369.53h-55.652V269.357h55.652c9.22,0,16.696-7.475,16.696-16.696c0-9.22-7.475-16.696-16.696-16.696H83.478 c-9.22,0-16.696,7.475-16.696,16.696v133.565c0,9.22,7.475,16.696,16.696,16.696h72.348c9.22,0,16.696-7.475,16.696-16.696 S165.047,369.53,155.826,369.53z"></path> </g> </g> <g> <g> <path d="M428.522,235.965h-72.348c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h55.652V369.53h-55.652 c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h72.348c9.22,0,16.696-7.475,16.696-16.696V252.661 C445.217,243.44,437.742,235.965,428.522,235.965z"></path> </g> </g> <g> <g> <path d="M461.913,38.957H50.087C22.469,38.957,0,61.426,0,89.044c0,4.754,0,327.745,0,333.913 c0,27.618,22.469,50.087,50.087,50.087h411.826c27.618,0,50.087-22.469,50.087-50.087c0-13.605,0-320.13,0-333.913 C512,61.426,489.531,38.957,461.913,38.957z M478.609,422.957c0,9.206-7.49,16.696-16.696,16.696H50.087 c-9.206,0-16.696-7.49-16.696-16.696c0-10.246,0-196.041,0-205.913c0-9.206,7.49-16.696,16.696-16.696h411.826 c9.206,0,16.696,7.49,16.696,16.696C478.609,226.933,478.609,412.832,478.609,422.957z M478.609,169.828 c-5.226-1.853-10.843-2.872-16.696-2.872H50.087c-5.852,0-11.47,1.018-16.696,2.872v-14.002c0-9.206,7.49-16.696,16.696-16.696 h411.826c9.206,0,16.696,7.49,16.696,16.696V169.828z M478.609,108.611c-5.226-1.853-10.843-2.872-16.696-2.872H50.087 c-5.852,0-11.47,1.018-16.696,2.872V89.044c0-9.206,7.49-16.696,16.696-16.696h411.826c9.206,0,16.696,7.49,16.696,16.696V108.611 z"></path> </g> </g> </g></svg>

              Reportes Financieros</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">

              <h3 className="text-xl font-semibold text-gray-700">Análisis Financiero</h3>
              <p className="text-gray-500 mt-2">Ingresos, gastos y reportes detallados</p>
            </div>
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              <svg width="28px" height="28px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#2e2d2d" stroke="#2e2d2d"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="icomoon-ignore"> </g> <path d="M17.599 3.738v2.598l0.8 0.207c0.905 0.234 1.768 0.597 2.566 1.081l0.715 0.434 1.86-1.86 2.262 2.262-1.888 1.888 0.407 0.708c0.451 0.785 0.788 1.635 1.002 2.527l0.196 0.817h2.744v3.199h-2.806l-0.216 0.782c-0.233 0.844-0.583 1.654-1.040 2.406l-0.434 0.716 2.036 2.035-2.262 2.262-2.064-2.064-0.707 0.407c-0.734 0.422-1.531 0.745-2.368 0.961l-0.8 0.206v2.951h-3.199v-2.951l-0.8-0.206c-0.837-0.216-1.634-0.539-2.368-0.961l-0.708-0.407-2.064 2.064-2.262-2.262 2.036-2.035-0.434-0.716c-0.457-0.753-0.807-1.562-1.040-2.406l-0.216-0.782h-2.806v-3.199h2.744l0.196-0.817c0.213-0.891 0.551-1.742 1.002-2.527l0.407-0.708-1.888-1.888 2.262-2.262 1.86 1.86 0.715-0.434c0.798-0.484 1.661-0.848 2.566-1.081l0.8-0.207v-2.598h3.199zM16 20.799c2.646 0 4.798-2.153 4.798-4.799s-2.152-4.799-4.798-4.799-4.798 2.153-4.798 4.799c0 2.646 2.152 4.799 4.798 4.799zM18.666 2.672h-5.331v2.839c-1.018 0.263-1.975 0.67-2.852 1.202l-2.022-2.022-3.769 3.77 2.065 2.065c-0.498 0.867-0.875 1.81-1.114 2.809h-2.97v5.331h3.060c0.263 0.953 0.655 1.85 1.156 2.676l-2.198 2.198 3.769 3.77 2.241-2.241c0.816 0.469 1.7 0.828 2.633 1.069v3.191h5.331v-3.191c0.933-0.241 1.817-0.6 2.633-1.069l2.241 2.241 3.769-3.77-2.198-2.198c0.501-0.826 0.893-1.723 1.156-2.676h3.060v-5.331h-2.97c-0.239-0.999-0.616-1.941-1.114-2.809l2.065-2.065-3.769-3.77-2.022 2.022c-0.877-0.532-1.834-0.939-2.852-1.202v-2.839h-0zM16 19.733c-2.062 0-3.732-1.671-3.732-3.733s1.67-3.732 3.732-3.732 3.732 1.671 3.732 3.732c0 2.062-1.67 3.733-3.732 3.733v0z" fill="#000000"> </path> </g></svg>
              Configuración del Sistema</h2>
            <div className="text-center py-12 bg-gray-50 rounded-lg">

              <h3 className="text-xl font-semibold text-gray-700">Ajustes y Configuración</h3>
              <p className="text-gray-500 mt-2">Configuración general de la barbería</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}