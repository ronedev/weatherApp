import './sass/App.scss'
import { geoContext } from 'components/context/geoContext';
import { useContext, useEffect, useState } from 'react';
import Home from 'components/home/Home';
import Header from 'components/header/Header';
import { api } from 'api';

function App() {
  const GeoContext = useContext(geoContext)

  const [woeid, setWoeid] = useState(null)
  const [actualWeather, setActualWeather] = useState(null)
  const [nextWeather, setNextWeather] = useState(null)
  const [actualPlace, setActualPlace] = useState(null)

  const getLocation = (latt, long) => {
    // fetch(`http://localhost:3002/get/location/${latt},${long}`)
    api.get(`search/?lattlong=${latt},${long}`)
      .then(res => {
        // console.log(res.data[0].woeid)
        setWoeid(res.data[0].woeid)
      })
      // .then(res => {
      //   // console.log(res)
      //   setWoeid(res[0].woeid)
      // })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }

  const getWeather = ()=>{
    // fetch(`http://localhost:3002/get/weather/${woeid}/`)
    api.get(`${woeid}/`)
      .then(res => {
        // console.log(res.data.consolidated_weather[0])
        setActualWeather(res.data.consolidated_weather[0])
        setNextWeather(res.data.consolidated_weather)
        setActualPlace(res.data.parent.title)
      })
      // .then(res => {
      //   // console.log(res)
      //   setActualWeather(res.consolidated_weather[0])
      //   setNextWeather(res.consolidated_weather)
      //   setActualPlace(res.parent.title)
      // })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }

  useEffect(() => {
    if (GeoContext.latitud && GeoContext.longitud) {
      getLocation(GeoContext.latitud, GeoContext.longitud)
    }
    if(woeid){
      getWeather(woeid)
    }
  },[GeoContext.latitud, GeoContext.longitud, woeid])
  return (
    <header className='headerContainer'>
      <Home weather={actualWeather} place={actualPlace}/>
      <Header weather={nextWeather} />
    </header>
  );
}

export default App;
