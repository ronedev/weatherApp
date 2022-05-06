import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { loadingContext } from './loadingContext'

const geoContext = React.createContext()

const GeoProvider = ({ children }) => {

    const LoadingContext = useContext(loadingContext)

    const [latitud, setLatitud] = useState(null)
    const [longitud, setLongitud] = useState(null)
    const [escalaTemperatura, setEscalaTemperatura] = useState('celsius')

    const success = (res) => {
        if(latitud !== res.coords.latitude && longitud !== res.coords.longitude){
            setLatitud(res.coords.latitude)
            setLongitud(res.coords.longitude)
        }else{
            LoadingContext.setLoading(false)
            toast('The selected location is the current one', {
                icon: '🌍'
            })
        }
    }

    const updateLocation = (location)=>{
        if(latitud !== location[0] && longitud !== location[1]){
            setLatitud(location[0])
            setLongitud(location[1])
        }else{
            LoadingContext.setLoading(false)
            toast('The selected location is the current one', {
                icon: '🌍'
            })
        }
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