import React from 'react'

export default function Hero() {
    return (
        <section className='relative'>
            <img className='opacity-60 m-auto w-full ' src="https://img.freepik.com/fotos-premium/barber-shop-with-vintage-aesthetic-showcasing-the-history-and-tradition-of-the-shop_117038-13572.jpg" alt="foto de barbero y cliente" />
            <h1 className='absolute top-1/2 font-[sadsadsa] transform -translate-1/2 left-1/4 sm:text-6xl md:text-7xl sm:left-1/5 lg:text-8xl text-3xl'>
                <p><span className='text-amber-400 text-4xl sm:text-7xl md:text-8xl lg:text-9xl animate-pulse'>T</span>he</p>
                <p><span className='text-amber-400 text-4xl sm:text-7xl md:text-8xl  lg:text-9xl animate-pulse'>B</span>arber´s</p>
                <p><span className='text-amber-400 text-4xl sm:text-7xl md:text-8xl  lg:text-9xl animate-pulse'>B</span>rothers</p>
            </h1>
        </section>
    )
}
