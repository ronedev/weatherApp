import React, { useEffect, useState } from 'react'

const geoContext = React.createContext()

const GeoProvider = ({ children }) => {
    const [latitud, setLatitud] = useState(null)
    const [longitud, setLongitud] = useState(null)
    const [escalaTemperatura, setEscalaTemperatura] = useState('celsius')

    const success = (res) => {
        setLatitud(res.coords.latitude)
        setLongitud(res.coords.longitude)
    }

    const updateLocation = (location)=>{
        setLatitud(location[0])
        setLongitud(location[1])
    }

    const error = (err)=>{
        console.error(`Ha ocurrido un problema al localizar al usuario: `, err)
    }

    const getActualLocation = ()=>{
        navigator.geolocation.getCurrentPosition(success, error)
    }

    const changeEscalaTemperatura = (escala) =>{
        switch(escala){
            case 'fahrenheit':
                setEscalaTemperatura('fahrenheit')
                break
            case 'celsius':
                setEscalaTemperatura('celsius')
                break
            default:
                setEscalaTemperatura('celsius')
        }
    }

    useEffect(()=>{
        if(!latitud && !longitud){
            getActualLocation()
        }
    })
    return (
        <geoContext.Provider value={
            {
                latitud: latitud,
                longitud: longitud,
                escalaTemperatura: escalaTemperatura,
                changeEscalaTemperatura: changeEscalaTemperatura,
                updateLocation: updateLocation,
                getActualLocation: getActualLocation
            }
        }>
            {children}
        </geoContext.Provider>
    )
}

export { GeoProvider, geoContext }