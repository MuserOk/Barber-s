
import React from 'react'
import Hero from '../components/app/hero'
import Carousel from "../components/home/Carousel"
import Video from '../components/home/Video'
import Comments from '../components/home/Comments'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const navigate = useNavigate();
   const { user } = useAuth(); // <--- Obtener el estado del usuario

 // Función de redirección inteligente para "Reservar Turno"
  const handleReserve = () => {
    if (user) {
      // Si está logueado, redirigir a su panel (UserPage)
      navigate("/userPage");
    } else {
      // Si no está logueado, redirigir al login
      navigate("/logIn");
    }
  };



   // registrarse como nuevo usaurio
  const handleRegUser = () => {
    navigate("/regUser");
  };

  

  return (
    <div>
      <Hero />
      {/*SOBRE NOSOTROS*/}
      <section className='px-4 py-8 text-sm text-center flex flex-col gap-6'>
        <p className='px-8'>Somos una barbería con actitud, donde la buena onda y la atención personalizada son parte del servicio.
          Nos apasiona ayudarte a encontrar tu mejor versión, ya sea con un corte clásico, un fade perfecto o un perfilado de barba a tu medida.
        </p>
        <p className='font-medium text-lg'>Pasá, relajate y disfrutá del ritual de verte bien.</p>
      </section>
      {/*MEDIA*/}
      <section className='grid grid-cols-1 justify-center items-center gap-6 m-2'>
        <div>
          <Carousel />
        </div>
        <div>
          <Video />
        </div>
      </section>
      {/*BTN Y COMENTARIOS*/}
      <section className='flex flex-col justify-center items-center py-4'>
        <button onClick={handleReserve} className='bg-amber-700 px-2 lg:py-2 sm:text-lg md:text-2xl lg:text-4xl mx-auto py-1 mb-8 rounded hover:bg-amber-500 active:bg-amber-600'>
          {user ? 'Ir a mi Panel' : 'Reservá tu Turno'}
        </button>
        <h6 className='md:text-xl lg:text-3xl'>¿Nuevo aquí?</h6>
        <p className='text-center text-xs p-2 md:text-sm lg:text-lg lg:py-4'>Regístrate como cliente y comienza a acumular beneficios</p>
        <button onClick={handleRegUser} className='bg-green-800 py-1 lg:mb-2 lg:py-2 px-2 sm:text-lg md:text-2xl lg:text-4xl rounded hover:bg-green-600 active:bg-green-700 shadow-2xs'>
          Registrarse
          </button>
        < Comments />
      </section>
    </div>
  )
}
