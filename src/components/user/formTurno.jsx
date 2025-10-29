import React from 'react'
import { useNavigate } from "react-router-dom";

export default function FormTurno() {
  return (
    <div className='text-gray-950 flex flex-col justify-center items-center gap-4 bg-amber-300'>
      <form action="">
        <h2>Reservar Turno</h2>
        <div >
        <label htmlFor="">Fecha</label>
        <input type="date" placeholder='25-dic-2025' />
        <label htmlFor="">Hora</label>
        <input type="select" />
        {/*Hoarios disponibles de ese dia y barbero*/}
        <label htmlFor="">Barbero</label>
        <input type="select" />
        <select name="" id="">
            <p>Jaimito</p>
            <p>Pepito</p>
            <p>Fulanito</p>
        </select>
        <button type="submit">Reservar</button>
        </div>
      </form>
    </div>
  )
}
