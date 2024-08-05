import React, { ChangeEvent, useContext, useRef } from 'react'
import { PlacesContext } from '../context'
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
  const debouncerRf = useRef<NodeJS.Timeout | null>() // useRef para mantener la referencia al timeout

  const { searchPlacesByterm} = useContext(PlacesContext);

  const onQueryCahnged = (event:ChangeEvent<HTMLInputElement>) =>{


    if(debouncerRf.current){ //  si ya hay un timeout en ejecución, lo limpiamos
      clearTimeout(debouncerRf.current); // climpiamos el timeout
    }
    debouncerRf.current = setTimeout (()=>{
      //todo:buscar o ejecutar consulta
      searchPlacesByterm(event.target.value);
      console.log( ' debounced value',event.target.value);
    }, 1000);

    
  }

  return (
    <div className='search-container'> 
    <input
     type='text' 
     placeholder='Search for a place...'
     onChange={onQueryCahnged}
      className='form-control' />
  
    <SearchResults />
    </div>
  )
}
