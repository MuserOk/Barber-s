import React from 'react'

// array para recorrer y simular tendendias nuevas (estas se actualizan periodicamente)
const tendencias = [
    { id: 1, nombre:"JUI", img: "https://i.pinimg.com/736x/a3/db/29/a3db298d9e26e12a38268be8555fd21d.jpg" },
    { id: 2, nombre:"SOJT", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwcxHUneWfy0n-Xp-TbHYTu-7QIFMt7E-sTKQJEO8eLXW1gdFaQPYaxk_7OxfPEMtr1Z0&usqp=CAU" },
    { id: 3, nombre:"KLI", img: "https://storage.googleapis.com/belity_web_images/blog/tendencias-corte-barberia-6.jpeg" },
    { id: 4, nombre:"PACHS", img: "https://i.pinimg.com/originals/e1/58/ac/e158ac1abb00f555135825d26cde2c44.jpg" },
    { id: 5, nombre:"JULO", img: "https://i.pinimg.com/736x/4f/25/79/4f25797b294758d8f4ebce7c3eabdd08.jpg" },
    { id: 6, nombre:"WASD", img: "https://i.pinimg.com/736x/eb/1f/e0/eb1fe0d7310ff8b072965ee398b0800d.jpg" },
    { id: 7, nombre:"REDS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbvL1nnaOOMfgaxvkWYkM9kyBi__VLE-DDw&s" },
    { id: 8, nombre:"GASC", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcB1sFzZ7e6Xlxau7yAOtjUtUMP9u_eQAVkni4c3Z7prtYjA2Bp50sva1BXdRpaJkoPY&usqp=CAU" },
    { id: 9, nombre:"BESS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsh6_r4DKXSAImBsnlpfn6z216T07p4OgppbzVFLk-i4Xzmpl9JrBWqunPg6foAlLmiGs&usqp=CAU" },
    { id: 10, nombre:"HEDS", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSADPxyAyqWPUrXnWSc1_TyOM_d4jD1TCgMT20M97SrQnAgQQvU4CRIW21cnRlx39-D4eI&usqp=CAU" },
]

export default function CardsTendencias() {
    return (
        <>
            {tendencias.map((corte) => (
                <div 
                    key={corte.id} 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group min-w-[246px] max-w-[280px]"
                >
                    {/* Imagen con efecto hover */}
                    <div className="relative overflow-hidden">
                        <img 
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                            src={corte.img} 
                            alt={`Corte de tendencia ${corte.nombre}`} 
                        />
                        {/* Badge de tendencia */}
                        <div className="absolute top-3 right-3">
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                🔥 TENDENCIA
                            </span>
                        </div>
                        {/* Overlay en hover */}
                        <div className="absolute inset-0  md:bg-black/80 bg-opacity-0 group-hover:bg-black/10 transition-all duration-300" />
                    </div>
                    
                    {/* Contenido de la tarjeta */}
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-gray-800 truncate">
                                {corte.nombre}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                #{corte.id.toString().padStart(2, '0')}
                            </span>
                        </div>
                        
                        {/* Botón de acción */}
                        <div className="flex justify-between items-center mt-4">
                            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2">
                                Lo quiero
                            </button>
                            <button className="text-gray-400 hover:text-amber-500 transition-colors duration-200">
                                ❤️
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}