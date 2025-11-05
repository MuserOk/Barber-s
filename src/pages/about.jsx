import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function About() {
  const navigate = useNavigate();


  const handleReservarClick = () => {

    navigate('/userPage'); 
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Acerca de Nosotros
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Más de una década creando estilos que definen personalidades
          </p>
        </div>

        {/* Historia */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-6">Nuestra Historia</h2>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Fundada en 2010, <span className="font-semibold text-amber-600">Los Hermanos Barberos</span> nació 
                con la visión de revivir la tradición de la barbería clásica combinada con las técnicas 
                más modernas del cuidado masculino.
              </p>
              <p className="text-stone-600 mb-4 leading-relaxed">
                Lo que comenzó como un pequeño local familiar hoy se ha convertido en un referente 
                de calidad y estilo en la comunidad, manteniendo siempre nuestro compromiso con 
                la excelencia y la satisfacción del cliente.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">12+</div>
                  <div className="text-sm text-stone-500">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">5k+</div>
                  <div className="text-sm text-stone-500">Clientes Satisfechos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-sm text-stone-500">Barberos Expertos</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
                <img className='w-full max-w-sm bg-linear-to-br rounded-2xl' src="https://images.fresha.com/lead-images/placeholders/barbershop-96.jpg?class=venue-gallery-mobile" alt="el primer barbero" />
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "✂️",
                title: "Calidad Artesanal",
                description: "Cada corte es una obra de arte, ejecutada con precisión y atención al detalle."
              },
              {
                icon: "🤝",
                title: "Confianza",
                description: "Construimos relaciones duraderas basadas en la confianza y el respeto mutuo."
              },
              {
                icon: "💡",
                title: "Innovación",
                description: "Siempre actualizados con las últimas tendencias y técnicas del sector."
              },
              {
                icon: "⭐",
                title: "Excelencia",
                description: "Nos esforzamos por superar las expectativas en cada servicio."
              },
              {
                icon: "🏠",
                title: "Comunidad",
                description: "Más que una barbería, somos un punto de encuentro para la comunidad."
              },
              {
                icon: "🔄",
                title: "Tradición & Modernidad",
                description: "Combinamos técnicas clásicas con estilos contemporáneos."
              }
            ].map((valor, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl mb-4">{valor.icon}</div>
                <h3 className="text-xl font-semibold text-stone-800 mb-3">{valor.title}</h3>
                <p className="text-stone-600 leading-relaxed">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                nombre: "Carlos Rodríguez",
                puesto: "Barbero Principal",
                experiencia: "8 años",
                especialidad: "Cortes Clásicos & Fade",
                foto: "👨‍💼"
              },
              {
                nombre: "Miguel Torres",
                puesto: "Especialista en Barbas",
                experiencia: "6 años",
                especialidad: "Barbas & Diseños",
                foto: "🧔‍♂️"
              },
              {
                nombre: "Juan Martínez",
                puesto: "Estilista Moderno",
                experiencia: "5 años",
                especialidad: "Tendencias & Color",
                foto: "👨‍🎨"
              }
            ].map((miembro, index) => (
              <div key={index} className="text-center p-6 bg-stone-50 rounded-xl">
                <div className="text-6xl mb-4">{miembro.foto}</div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">{miembro.nombre}</h3>
                <p className="text-amber-600 font-semibold mb-2">{miembro.puesto}</p>
                <p className="text-stone-600 text-sm mb-1">{miembro.experiencia} de experiencia</p>
                <p className="text-stone-500 text-sm">{miembro.especialidad}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para tu próximo corte?</h2>
          <p className="text-amber-100 mb-6 text-lg">
            Únete a nuestra familia y descubre por qué somos la barbería de confianza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleReservarClick}  className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-stone-100 transition duration-200">
              Reservar Cita
            </button>
            
          </div>
        </div>

      </div>
    </div>
  )
}