import axios from "axios";

const directionsApis = axios.create({
    baseURL: 'https://api.openrouteservice.org/v2/directions',
    params:{
        api_key:'5b3ce3597851110001cf6248161cc92db8104d1792df0eeca3a80f42',
        
    }
})

export default directionsApis;
