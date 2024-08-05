import { Feature } from "../../interface/places";
import { PlacesState } from "./PlacesProvider";

type PlacesAction = {
    type: 'setLocation',
    payload: [number, number]
} |
{ type: 'setLoadingPlaces' } |

{ type: 'setPLaces', payload: Feature[] }
export const placesReducer = (state:PlacesState,action:PlacesAction):PlacesState => {
    
    switch(action.type){
        case 'setLocation':

        return {
            ...state,
            isLoading:false,
            userLocation:action.payload,
         
        }
        case 'setLoadingPlaces': 
        return {
            ...state,
            isLoadingPLaces:true,
        }
        case 'setPLaces': 
        return{
            ...state,
            isLoadingPLaces:false,
            places:action.payload,
        }
        default:
            return state;
    }

}
