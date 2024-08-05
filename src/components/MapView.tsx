import React, { useContext, useLayoutEffect, useRef } from 'react'
import { Mapcontext, PlacesContext } from '../context'
import { Loading } from './Loading';
import { Map } from '@maptiler/sdk'


export const MapView = () => {

    //aqui sacacamos los datos del context
    const {setMap} = useContext(Mapcontext); //aqui sacamos el setMap del context
    const { isLoading,userLocation} = useContext(PlacesContext);
    const mapDiv = useRef<HTMLDivElement>(null); //esto va servir para referenciar el div del mapa
  

    useLayoutEffect(() => {
      if(!isLoading){ //si no esta cargando

        //aqui se crea el mapa
        const map = new Map({
          container: mapDiv.current!,
          style: 'https://api.maptiler.com/maps/streets/style.json?key=Yyli32naHifn9Qr83LPq',
          center: userLocation,
          zoom:14,
          
        });




          /*
        const map = new Map({
          container:mapDiv.current!, // container's id or the HTML element in which SDK will render the map
          style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=Yyli32naHifn9Qr83LPq',
          center: userLocation, // starting position [lng, lat]
          zoom: 14 // starting zoohttps://api.maptiler.com/maps/streets-v2/style.json?key=Yyli32naHifn9Qr83LPq
      });*/

        /*
        const map = new maptilersdk.Map({
          container: mapDiv.current as HTMLDivElement,
          key: 'Yyli32naHifn9Qr83LPq',
          style: 'https://maps.tilehosting.com/styles/streets/style.json?key=YOUR_API_KEY',
          center: userLocation,
          zoom: 15,
        });
        map.addControl(new maptilersdk.NavigationControl());
        */
       setMap(map); 
      }

      
    }, [isLoading, userLocation]);





    if(isLoading){
        return(<Loading />)
    }



    return (
  <div
  ref={mapDiv}
  style={{
    backgroundColor: 'grey',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
  }}
  > { userLocation?.join(',')}

  
  </div>
  )
}
