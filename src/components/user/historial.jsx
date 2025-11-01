// src/components/user/historial.jsx (Modificado)

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useApi } from '../../hooks/useApi'; // <--- Importar useApi

export default function Historial() {
  const { data: historial, isLoading, error, execute } = useApi(); // <--- Usar useApi
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null)

  // Función para cargar el historial
  const fetchHistorial = useCallback(async () => {
      await execute('get', '/user/historial');
  }, [execute]);

  // Cargar historial al montar
  useEffect(() => {
      fetchHistorial();
  }, [fetchHistorial]);

  // ----------------------------------------------------------------
  // Lógica de Estadísticas (Usando useMemo para eficiencia)
  // ----------------------------------------------------------------
  const stats = useMemo(() => {
    if (!historial || historial.length === 0) {
      return { totalCortes: 0, mejorRating: 0, barberosDiferentes: 0, totalInvertido: 0 };
    }

    const totalCortes = historial.length;
    const ratings = historial.map(c => c.rating).filter(r => r !== null);
    const mejorRating = ratings.length > 0 ? Math.max(...ratings) : 0;
    const barberos = [...new Set(historial.map(c => c.barbero))];
    const barberosDiferentes = barberos.length;
    const totalInvertido = historial.reduce((sum, c) => sum + parseFloat(c.precio), 0).toFixed(2);

    return { totalCortes, mejorRating, barberosDiferentes, totalInvertido };
  }, [historial]);
  // ----------------------------------------------------------------

  const compartirEnRedes = (corte) => {
    const texto = `¡Mi nuevo corte en la barbería! Realizado por ${corte.barbero}. ${corte.servicio} 💈`;
    const url = corte.fotos[0];
    
    // Simular compartir en diferentes redes sociales
    if (navigator.share) {
      navigator.share({
        title: 'Mi Corte de Pelo',
        text: texto,
        url: url
      })
      .then(() => console.log('Compartido exitosamente'))
      .catch((error) => console.log('Error al compartir', error));
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(texto)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
  }

  const descargarFoto = (fotoUrl) => {
    // Simular descarga de foto
    const link = document.createElement('a');
    link.href = fotoUrl;
    link.download = `corte-barberia-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const abrirModalFoto = (foto) => {
    setFotoSeleccionada(foto)
  }

  const cerrarModalFoto = () => {
    setFotoSeleccionada(null)
  }
  
  // Manejo de Carga y Error
  if (isLoading) {
      return (
          <div className="text-center py-12 text-gray-800">
              <p className="text-xl font-semibold">Cargando historial de cortes...</p>
          </div>
      );
  }
  
  if (error) {
      return (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700">
              <p className="font-bold">Error al cargar historial:</p>
              <p>{error}</p>
          </div>
      );
  }
  
  // Mensaje si no hay historial
  if (!historial || historial.length === 0) {
    return (
      <div className="text-center py-12 text-gray-800">
        <div className="text-6xl mb-4">💈</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Aún no tienes cortes registrados
        </h3>
        <p className="text-gray-500">
          Agenda tu primera cita y aparecerá aquí tu historial
        </p>
      </div>
    );
  }


  return (
    <>
      <div className="mx-auto py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-xl font-medium">Revisa todos tus servicios y comparte tus mejores looks</p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{stats.totalCortes}</div>
            <div className="text-sm text-gray-600">Total Cortes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {stats.mejorRating}/5
            </div>
            <div className="text-sm text-gray-600">Mejor Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {stats.barberosDiferentes}
            </div>
            <div className="text-sm text-gray-600">Barberos Diferentes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">
              ${stats.totalInvertido}
            </div>
            <div className="text-sm text-gray-600">Total Invertido</div>
          </div>
        </div>

        {/* Lista de cortes */}
        <div className="space-y-6 sm:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {historial.map((corte) => (
            <div key={corte.id} className="bg-white rounded-xl shadow-lg overflow-hidden  lg:max-h-94">
              {/* Header del corte */}
              <div className="bg-linear-to-r from-amber-500 to-orange-500 p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">{corte.servicio}</h3>
                    <p className="text-amber-100">
                      {new Date(corte.fecha).toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${corte.precio}</div>
                    <div className="flex items-center justify-end space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < corte.rating ? 'text-yellow-300' : 'text-amber-200'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del corte */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-semibold">Barbero:</span> {corte.barbero}
                    </p>
                    {corte.notas && (
                      <p className="text-gray-600 mt-1">
                        <span className="font-semibold">Notas:</span> {corte.notas}
                      </p>
                    )}
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => compartirEnRedes(corte)}
                      className="bg-blue-500 hover:bg-blue-600 border-2 border-gray-200 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-1 transition duration-200"
                    >
                      
                      <span>Compartir</span>
                    </button>
                  </div>
                </div>

                {/* Galería de fotos */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Fotos del Corte</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {corte.fotos.map((foto, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={foto}
                          alt={`Corte ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition duration-200"
                          onClick={() => abrirModalFoto(foto)}
                        />
                        <div className="absolute inset-0 md:bg-black/80  group-hover:bg-black/10 transition duration-200 rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            descargarFoto(foto)
                          }}
                          className="absolute top-2 right-2 z-40 bg-black bg-opacity-50 text-white p-1 rounded md:opacity-0 group-hover:opacity-100 transition duration-200"
                        >
                          <svg fill="#b1920f" height="1rem" width="1rem" version="1.1" id="Capa_1" viewBox="0 0 419.686 419.686" stroke="#b1920f"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M415.436,279.342c-5.878-11.272-16.921-18.655-29.39-19.881V216.2l10.021-67.63c1.089-7.356-1.078-14.822-5.935-20.452 c-4.552-5.276-11.043-8.449-17.962-8.828V65.966c0-25.979-21.135-47.116-47.114-47.116h-76.504 c-25.459,0-38.974,10.751-48.843,18.601c-7.934,6.309-12.722,10.118-22.994,10.118H66.157c-23.151,0-41.985,18.356-41.985,40.918 v30.803c-6.917,0.379-13.41,3.552-17.962,8.828c-4.857,5.63-7.023,13.096-5.934,20.452l30.686,207.117 c1.857,12.537,12.62,21.824,25.295,21.824h243.668l5.135,7.361c6.977,9.996,18.416,15.963,30.604,15.963 c12.188,0,23.63-5.968,30.609-15.967l46.683-66.919C420.94,306.501,421.888,291.706,415.436,279.342z M54.96,119.252V88.487 c0-6.341,5.692-10.129,11.197-10.129h110.558c21.024,0,32.742-9.321,42.158-16.812c8.692-6.913,14.972-11.908,29.679-11.908h76.504 c9.003,0,16.326,7.325,16.326,16.328v53.286H54.96z M393.811,304.605l-46.682,66.919c-2.618,3.752-6.904,5.987-11.48,5.987 c-4.571,0-8.858-2.235-11.477-5.987l-46.682-66.919c-2.983-4.276-3.341-9.856-0.929-14.479c2.412-4.622,7.193-7.522,12.407-7.522 h19.626v-57.977c0-7.73,6.267-13.994,13.995-13.994h26.123c7.728,0,13.996,6.264,13.996,13.994v57.979h19.624 c5.215,0,9.996,2.899,12.409,7.522C397.152,294.749,396.793,300.329,393.811,304.605z"></path> </g></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay historial */}
        {historial.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💈</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aún no tienes cortes registrados
            </h3>
            <p className="text-gray-500">
              Agenda tu primera cita y aparecerá aquí tu historial
            </p>
          </div>
        )}
      </div>

      {/* Modal para foto ampliada */}
      {fotoSeleccionada && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={cerrarModalFoto}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={fotoSeleccionada}
              alt="Corte ampliado"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={cerrarModalFoto}
              className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition duration-200"
            >
              ✕
            </button>
            <button
              onClick={() => descargarFoto(fotoSeleccionada)}
              className="absolute bottom-4 right-4 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
            >
              <span>⬇️</span>
              <span>Descargar</span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}