"use client"

import {Transition} from "../Transition"
import {Slider} from "./Slider"

export function Services() {
    return (
        <Transition className="grid px-4 py-8 md:py-46 md:px-36 md:grid-cols-2 md:gap-28">
            <div className="max-w-xl mb-7">
                <h4 className="text-secondary">Servicios</h4>
                <h2 className="my-4 text-3xl font-semibold">Promociona tu vivienda para arrendarla o venderla al mejor precio</h2>
                <p className="mb-10 mt-7">
      Nuestro equipo te ayuda a destacar tu propiedad en el mercado con estrategias de marketing
      digital, fotografía profesional y una amplia red de clientes potenciales.  
      Nos encargamos de todo el proceso: desde la publicación y gestión de visitas hasta la firma del contrato.  
      Además, ofrecemos asesoramiento personalizado para determinar el valor real de tu vivienda y maximizar su rentabilidad, ya sea para venta o arriendo.
    </p>
            </div>
            <div className="flex items-center justify-center">
                <Slider />
            </div>
        </Transition>
    ) 
}
