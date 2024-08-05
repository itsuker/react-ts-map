import React, { useContext } from 'react'
import { Mapcontext, PlacesContext } from '../context'
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa Bootstrap Icons

export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(Mapcontext); //aqui se saca el map y el ismapready del context
    const { userLocation } = useContext(PlacesContext);
    const onClick = () => {
        if (!isMapReady) throw new Error('Map is not ready'); //aqui se valida si el mapa esta listo
        if (!userLocation) throw new Error('User location is not ready'); //aqui se valida si la ubicacion del usuario esta lista

        map?.flyTo({ //aqui se mueve el mapa a la ubicacion del usuario
            center: userLocation,
            zoom: 14,
        })
    
    }
   

return (
    <div>
        <button  className=' btn btn-outline-secondary   bi bi-geo-alt-fill'
        onClick={onClick}
        style={{
            position: 'fixed',
            top: '180px',
            right: '10px',
            zIndex: 999
        }}
    >
      
    </button> 
    
    
 </div> 
    
)

}

