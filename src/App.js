import './sass/App.scss'
import { geoContext } from 'components/context/geoContext';
import { useContext, useEffect, useState } from 'react';
import Home from 'components/home/Home';

function App() {
  const GeoContext = useContext(geoContext)

  const [woeid, setWoeid] = useState(null)
  const [actualWeather, setActualWeather] = useState(null)
  const [actualPlace, setActualPlace] = useState(null)

  const getLocation = (latt, long) => {
    fetch(`http://localhost:3002/get/location/${latt},${long}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        setWoeid(res[0].woeid)
      })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }

  const getWeather = ()=>{
    fetch(`http://localhost:3002/get/weather/${woeid}/`)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        setActualWeather(res.consolidated_weather[0])
        setActualPlace(res.parent.title)
      })
      .catch(err => console.log(`Error al hacer llamada a la api desde el cliente: `, err))
  }

  useEffect(() => {
    if (GeoContext.latitud && GeoContext.longitud) {
      getLocation(GeoContext.latitud, GeoContext.longitud)
    }
    if(woeid){
      getWeather(woeid)
    }
  })
  return (
    <>
      <Home weather={actualWeather} place={actualPlace}/>
    </>
  );
}

export default App;
