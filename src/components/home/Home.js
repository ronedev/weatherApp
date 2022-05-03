import React from 'react'
import placeIcon from 'img/icon/place.png'

const Home = ({weather, place}) => {
    console.log(weather)
  return (
    <aside className='homeContainer'>
        <div className='btnContainer'>
            <button className='btn1'>Search for places</button>
            <button className='btn2'><img src={placeIcon} alt="locationIcon" /></button>
        </div>
        <img src={`https://www.metaweather.com/static/img/weather/png/${weather.weather_state_abbr}.png`} alt="weatherIcon" />
        <h1 className='temperature'>{weather.the_temp}</h1>
        <h2 className='weather'>{weather.weather_state_name}</h2>
        <span className='date'>{weather.applicable_date}</span>
        <span className='place'>{place}</span>
    </aside>
  )
}

export default Home