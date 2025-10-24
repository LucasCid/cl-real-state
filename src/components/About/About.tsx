import Image from "next/image";
import { Transition } from "../Transition";

export function About() {
    return (
        <Transition className="grid gap-4 px-4 py-8 md:py-44 md:px-36 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center max-w-xl mb-7" id="about">
                <h4 className="text-secondary">Sobre Nosotros</h4>
                <h2 className="my-4 text-3xl font-semibold">Mas de 1.000 viviendas para vender y comprar en Chile</h2>
                 <p className="mb-10 mt-7">
      En <strong>CL RealState</strong> nos especializamos en conectar a las personas con el hogar que siempre soñaron.  
      Con años de experiencia en el mercado inmobiliario chileno, ofrecemos un servicio integral que abarca desde la búsqueda y tasación de propiedades hasta la asesoría legal y financiera.  
      Nuestro compromiso es brindar confianza, transparencia y acompañamiento en cada etapa del proceso, ya sea que estés comprando, vendiendo o invirtiendo.
    </p>
                <button className="px-4 py-3 text-white transition-all duration-200 rounded-lg bg-secondary hover:bg-black">Cargar mas</button>
            </div>
            <div className="flex items-center justify-center">
                <Image src="/assets/house.jpeg" alt="About" width={350} height={450} className="w-auto h-auto " priority />
            </div>
        </Transition>
    )
}
