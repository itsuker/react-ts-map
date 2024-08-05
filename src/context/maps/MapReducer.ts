import { Map, Marker } from "@maptiler/sdk";
import { MapState } from "./MapProvider";

type MapAction = 
|{type: 'setMap' ,payload:Map}
|{type: 'setMarkers' ,payload:Marker[]}
                           
export const mapReducer = (state:MapState , action:MapAction):MapState =>{
                         //MapState es el tipo de dato que va a regresar
                         //action es el tipo de dato que va a recibir
    switch(action.type){
        case 'setMap':
            return {
                ...state,
                isMapReady:true,
                map:action.payload
            }
        case 'setMarkers': 
            return {
                ...state,
                markers:action.payload
            }


        


        default:
            return state
    }
}