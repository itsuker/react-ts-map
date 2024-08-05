import React, { useContext, useEffect, useReducer } from 'react'
import { Mapcontext } from './MapContext'
import { mapReducer } from './MapReducer';
import { GeoJSONSourceSpecification, LngLatBounds, Map, Marker, Popup } from '@maptiler/sdk'
import { PlacesContext } from '../places/PlacesContex';
import { directionsApis } from '../../apis';
import { DirectionsResponse } from '../../interface/directions';


export interface MapState {
    isMapReady: boolean,
    map?:Map,
    markers:Marker[],
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

interface Props  {
    children:JSX.Element | JSX.Element[]
}




export const MapProvider = ( {children}:Props) => {
    const [state, dispatch] = useReducer(mapReducer,INITIAL_STATE); // aui resive el mapreducer y el estado inicial

    const {  places} = useContext(PlacesContext);


    useEffect(()=>{
           // console.log(places);
           state.markers.forEach(marker => marker.remove());
           const newMarkers:Marker[] = [];
           for (const place of places){
                const [Ing ,lat] = place.center;
                const popup = new Popup()
                .setHTML(`<h6>${place.text_es}</h6>`);
                const newMarker = new Marker()
            .setPopup(popup) // el popup es para que cuando le de click en el marcador me muestre la informacion
            .setLngLat([Ing,lat]) // longitud y latitud
            .addTo(state.map!); // el signo de admiracion es para decirle que no es nulo
          newMarkers.push(newMarker);

            //Todo limpiar polyline
            dispatch({type: 'setMarkers', payload:newMarkers});
        
        }
    },[places])

    const setMap = (map:Map) =>{
        const myLocationPopPup = new Popup()
            .setHTML(`<h1>My Location</h1>
                <p>Algun lugar </p>
                `)

        new Marker({
            color: '#61DAFB',

        })
            .setLngLat(map.getCenter())
            .addTo(map)
            .setPopup(myLocationPopPup);
        dispatch({ type: 'setMap', payload: map })
    }
    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
        try {
            const resp = await directionsApis.get<DirectionsResponse>('/driving-car', {
                params: {
                    start: start.join(','),
                    end: end.join(',')
                }
            })
            // console.log(resp.data.features);
            const { distance, duration } = resp.data.features[0].properties.segments[0]; // destructuramos la distancia y la duracion
            const { coordinates: coords } = resp.data.features[0].geometry // destructuramos las coordenadas y las guardamos en coords
            let kms = distance / 1000;
            kms = Math.round(kms * 100);
            kms /= 100;

            const durationInMinutes = Math.floor(duration / 60);
            console.log({ kms, durationInMinutes });


            const bounds = new LngLatBounds(
                start,
                start
            );
            for (const coord of coords) { //!si pasamos coord se va  a quejar porque no es un array de numeros
                const newCord:[number,number]= [coord[0], coord[1]]; // guardamos las coordenadas en newCord y las pasamos a number
                bounds.extend(newCord); // extendemos las coordenadas
            }
            state.map?.fitBounds(bounds,{ //ajustamos el mapa
                padding: 100 //padding es para que no se vea pegado al borde
            });
            //Polyline 
            const sourceData:GeoJSONSourceSpecification = { //creamos la fuente de datos de la polyline que sea de tipo geojson  y le pasamos las coordenadas
                
                type:'geojson',
                data:{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coords
                    }
                }
                /*
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: coords
                }*/
            }

            //TODO remover polyline si existe

            //si existe la capa la removemos y la fuente
            if(state.map?.getLayer('RouteString')){ //si existe la capa la removemos
                state.map?.removeLayer('RouteString'); //removemos la capa
                state.map?.removeSource('RouteString'); //  removemos la fuente
            }


            state.map?.addSource('RouteString',sourceData); //agregamos la fuente

            state.map?.addLayer({
                id:'RouteString',
                type:'line',
                source:'RouteString',
                layout:{
                   // 'line-join':'round',
                   // 'line-cap':'round'
                    'line-join':'round',
                    'line-cap':'round'

                },paint:{
                    'line-color':'black',
                    'line-width':3
                }
            })

        } catch (error) {
            console.log(error);
        }



    }



  return (
    <Mapcontext.Provider value={{
        ...state,
        setMap,
        getRouteBetweenPoints,
        


        //methodos
    }}>
    
        {children}

  

    </Mapcontext.Provider>
)
}
