import React from 'react'

export default function Video() {
    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <div className="relative w-full h-full">
                <iframe
                    className="w-full h-full aspect-video"
                    src="https://www.youtube.com/embed/_bfdN9Sc8oY"
                    title="Video de la barbería"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}
