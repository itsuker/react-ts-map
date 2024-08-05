export const getUserLocation = async ():Promise<[number,number]> => {


    return  new Promise((resolve,reject) =>{
        navigator.geolocation.getCurrentPosition(
            ( {coords}) =>{
                resolve([coords.longitude ,coords.latitude  ])
            },
            (err) =>{
                alert('No se pudo obtener la ubicacion');
                console.log(err);
                reject(); //si no se puede obtener la ubicacion
            }
        )
    })
}