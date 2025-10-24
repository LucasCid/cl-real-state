import { useState, useRef, useEffect } from "react";
import { GrFormDown, GrHome, GrFormUp } from "react-icons/gr";

export function SearchProperty() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div 
            ref={dropdownRef}
            className='relative mb-2 md:mb-0 flex items-center gap-4 border-[1px] rounded-lg px-3 py-2 justify-between cursor-pointer hover:shadow-md transition-all duration-300 hover:border-gray-400'
            onClick={() => setIsOpen(!isOpen)}
        >
            <GrHome className="text-gray-600" />
        
           <div>
                <p className="font-medium">Propiedad</p>
                <p className='text-xs text-gray-500'>Selecciona el tipo de propiedad</p>
           </div>
            {isOpen ? (
                <GrFormUp className="text-gray-600 transition-transform duration-300" />
            ) : (
                <GrFormDown className="text-gray-600 transition-transform duration-300" />
            )}
        
            <div className={`absolute top-[70px] bg-white z-50 p-4 rounded-lg shadow-light w-[230px] left-0 transition-all duration-300 transform origin-top ${
                isOpen 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}>
                <p className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">Casa</p>
                <p className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">Cabaña</p>
                <p className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer">Departamento</p>
            </div>
        </div>
    )
}