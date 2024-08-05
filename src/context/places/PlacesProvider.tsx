import React, { useEffect, useReducer } from 'react'
import { PlacesContext } from './PlacesContex';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers';
import { searchApi } from '../../apis';
import { Feature, PlacesAPI } from '../../interface/places';

//estado inicial de la aplicacion
export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPLaces:boolean;
  places:Feature[];

}

//estado inicial para el reducer
 const INITIAL_STATE: PlacesState = {
   isLoading:true,
   userLocation: undefined,
    isLoadingPLaces:false,
    places:[],
}
//iterface para definir las propiedades que se van a recibir
interface Props {
  children:JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({children}:Props) => { //children ayuda a que los componentes hijos puedan acceder a los datos del padre
const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
 useEffect(() => {

  
    getUserLocation() //se llama a la funcion getUserLocation para obtener la ubicacion del usuario
         .then(ingLat => dispatch({ //se envia un dispatch para que se muestre la ubicacion del usuario
          type: 'setLocation', //se envia el tipo de accion
          payload:ingLat
         }) )
 }, [])
 
 

 const searchPlacesByterm =  async(query:string):Promise<Feature []> =>{
    if(query.length === 0) {
      dispatch({type: 'setPLaces',payload: []}); //si la longitud del query es 0, entonces se envia un dispatch para que no se muestre nada
      return []; // se retorna un array vacio
    }
   if(!state.userLocation) throw new Error('no hay ubicacion del usuario'); //si no hay ubicacion del usuario, entonces se lanza un error
   
   dispatch({type: 'setLoadingPlaces'}); //se envia un dispatch para que se muestre el loading
   
   const resp = await searchApi.get<PlacesAPI>(`/${query}.json`,{ //se hace una peticion get a la api de maptiler y se le pasa el query
      params:{
        proximity:state.userLocation.join(','), //se le pasa la ubicacion del usuario en formato de string

       /** lat:state.userLocation[1],
        lon:state.userLocation[0] */
      }
    });
    //console.log(resp.data);
   dispatch ({type:'setPLaces' ,payload:resp.data.features}); //se envia un dispatch para que se muestren los lugares
    return resp.data.features;
 }
  return (
    <PlacesContext.Provider value={{
     ...state, //esto lo que hace es que se envie todo el estado 
      searchPlacesByterm,
      //isLoading: true,
   //   userLocation: undefined,
      
    }}> 
     {children} 
    </PlacesContext.Provider>
  )
}
