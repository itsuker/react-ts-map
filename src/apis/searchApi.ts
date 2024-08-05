import axios from 'axios';

const  searchApi = axios.create ({
    baseURL:'https://api.maptiler.com/geocoding',
    params:{
        key:'Yyli32naHifn9Qr83LPq',
        limit:3,
        language:'es',
        
    }

})

export default searchApi;