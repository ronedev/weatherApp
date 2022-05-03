import React, { useState } from 'react'

const geoContext = React.createContext()

const GeoProvider = ({ children }) => {
    const [latitud, setLatitud] = useState(null)
    const [longitud, setLongitud] = useState(null)

    const success = (res) => {
        setLatitud(res.coords.latitude)
        setLongitud(res.coords.longitude)
    }

    const error = (err)=>{
        console.error(`Ha ocurrido un problema al localizar al usuario: `, err)
    }

    navigator.geolocation.getCurrentPosition(success, error)

    return (
        <geoContext.Provider value={
            {
                latitud: latitud,
                longitud: longitud
            }
        }>
            {children}
        </geoContext.Provider>
    )
}

export { GeoProvider, geoContext }