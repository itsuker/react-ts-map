import React, { useContext, useState } from 'react'
import { Mapcontext, PlacesContext } from '../context'
import { LoadingPlaces } from './LoadingPlaces'
import { Feature } from '../interface/places';
//import { Feature } from '@maptiler/sdk'

export const SearchResults = () => {
    const {places,isLoadingPLaces ,userLocation} = useContext(PlacesContext);
    const {map ,getRouteBetweenPoints} =  useContext(Mapcontext);

    const [activeId, setactiveId] = useState('')

   const onPlaceClicked = (place:Feature) =>{
       const [lng,lat] = place.center;
     setactiveId(place.id);
      map?.flyTo({
          zoom: 14,
          center: [lng,lat]
        });
   }
   const getRoute = (place:Feature)=>{
    if(!userLocation)return;
    const [lng,lat] = place.center;
    getRouteBetweenPoints(userLocation,[lng,lat]);
      
   }



  if(isLoadingPLaces){
     return (
       <LoadingPlaces />
     )
  }

  if(places.length === 0){
    return <></>
  }
  
  
    return (
   <ul className='list-group mt-3'>
    {                //{id,text_es,place_name }
        places.map( place => ( //se optione de place los elementos
            <li 
            key={place.id}
            className={`list-group-item ${activeId === place.id ? 'active' : ''}`} //si el activeId es igual a place.id entonces se pone active si no se pone vacio
            style={{cursor: 'pointer'}}
            onClick={()=>onPlaceClicked(place)}
            >
            <h6>{ place.text_es} </h6>
            <p 
            className='text-muted'
            style={{fontSize: '12px'}}
            >
                 {place.place_name}
            </p>
            <button
            onClick={() => getRoute(place)}
            className= { ` btn btn-sm ${activeId === place.id ? 'btn-outline-secondary '  : ' btn-outline-primary'}`}>Direcciones</button>
        </li>

        ))
    }
       
   </ul>
  )
}
