import {RiSearch2Line} from 'react-icons/ri'

export function SearchButton() {
    return (
        <div className="gap-4 border-[1px] rounded-lg px-14 py-2 bg-secondary flex items-center text-white justify-center cursor-pointer hover:bg-secondary/90 transition-all duration-300 hover:shadow-md transform hover:scale-105">
            <RiSearch2Line className="text-lg" />
        </div>
    )
}