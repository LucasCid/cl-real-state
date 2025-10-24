import { SearchButton } from '../SearchButton'; 
import { SearchLocation } from '../SearchLocation'; 
import { SearchPriceRange } from '../SearchPriceRange'; 
import { SearchProperty } from '../SearchProperty'; 
import { Transition } from '../Transition';

export function FloatedSearch() { 
  return (
    <Transition className='absolute bottom-2 min-[400px]:bottom-10 md:-bottom-10 left-0 right-0 w-[75%] mx-auto'> 
      <div className='flex-col justify-between gap-1 py-1.5 px-2 bg-white rounded-md min-[400px]:gap-4 min-[400px]:py-4 min-[400px]:px-3 md:flex md:flex-row backdrop-blur shadow-light [&>*]:max-[400px]:py-1 [&>*]:max-[400px]:text-sm [&>*]:max-[400px]:min-h-0'> 
        <SearchLocation /> 
        <SearchProperty /> 
        <SearchPriceRange /> 
        <SearchButton /> 
      </div> 
    </Transition>
  ) 
}