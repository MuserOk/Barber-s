
import React from 'react'
import Carousel from '../components/home/Carousel'
import Video from '../components/home/Video'
import Comments from '../components/home/Comments'

export default function Home() {
  return (
    <div>
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
        <button className='bg-amber-700 px-2 mx-auto py-1 mb-8 rounded hover:bg-amber-500 active:bg-amber-600'>Reservá tu Turno</button>
        < Comments />
      </section>
    </div>
  )
}
