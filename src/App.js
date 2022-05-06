import './sass/App.scss'
import { geoContext } from 'components/context/geoContext';
import { useContext, useEffect, useState } from 'react';
import Home from 'components/home/Home';
import Header from 'components/header/Header';
import { api } from 'api';
import { loadingContext } from 'components/context/loadingContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const GeoContext = useContext(geoContext)
  const LoadingContext = useContext(loadingContext)

  const [actualWeather, setActualWeather] = useState(null)
  const [nextWeather, setNextWeather] = useState(null)
  const [actualPlace, setActualPlace] = useState(null)
  const [actualLatLong, setActualLatLong] = useState('')

  const toastOptions = {
    style: {
      color: '#1E213A',
      fontFamily: 'Raleway',
      fontWeight: '500',
      backgroundColor: '#C7B95A',
      fontSize: '12px'
    }
  }

  const getWeather = (woeid)=>{
    // fetch(`http://localhost:3002/get/weather/${woeid}/`)
    api.get(`${woeid}/`)
      .then(res => {
        setActualWeather(res.data.consolidated_weather[0])
        setNextWeather(res.data.consolidated_weather)
        setActualPlace(res.data.title)
        LoadingContext.setLoading(false)
      })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }

  const getLocation = (latt, long) => {
    // fetch(`http://localhost:3002/get/location/${latt},${long}`)
    api.get(`search/?lattlong=${latt},${long}`)
      .then(res => {
        setActualLatLong(res.data[0].latt_long)
        getWeather(res.data[0].woeid)
      })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }
  
  useEffect(() => {
    if ((GeoContext.latitud && GeoContext.longitud) && (GeoContext.latitud !== actualLatLong.split(",")[0] && GeoContext.longitud !== actualLatLong.split(",")[1])) {
      getLocation(GeoContext.latitud, GeoContext.longitud)
    }
  },[GeoContext])
  
  return (
    <header className='headerContainer'>
      <Home weather={actualWeather} place={actualPlace}/>
      <Header weather={nextWeather} />
      <Toaster 
        toastOptions={toastOptions}
      />
    </header>
  );
}

export default App;
