import { createContext } from "react";
import { Feature } from "../../interface/places";

export interface PlaceContextProps { //recordar poner un tipo de dato
     isLoading:boolean;
     userLocation?: [number, number];
     isLoadingPLaces:boolean;
     places:Feature[];

     //methods
     searchPlacesByterm: (query: string) => Promise<Feature[]>
}
//aqui exponemos el contexto a todos los componentes que lo necesiten 
export const PlacesContext = createContext<PlaceContextProps>({

} as PlaceContextProps); //recordar poner un tipo de dato