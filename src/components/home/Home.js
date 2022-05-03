import React from 'react'
import placeIcon from 'img/icon/place.png'
import nube from 'img/icon/nube.png'

const Home = ({weather, place}) => {
    console.log(weather)
    if(weather){
      return (
        <aside className='homeContainer'>
          <img src={nube} alt="nubeIcon" className='nubeBackground one' />
          <img src={nube} alt="nubeIcon" className='nubeBackground two' />
          <img src={nube} alt="nubeIcon" className='nubeBackground three' />
          <img src={nube} alt="nubeIcon" className='nubeBackground four' />
            <div className='btnContainer'>
                <button className='btn1'>Search for places</button>
                <button className='btn2'><img src={placeIcon} alt="locationIcon" /></button>
            </div>
            <img src={`https://www.metaweather.com/static/img/weather/png/${weather.weather_state_abbr}.png`} alt="weatherIcon" />
            <h1 className='temperature'>{Math.round(weather.the_temp)}<span>°C</span></h1>
            <h2 className='weather'>{weather.weather_state_name}</h2>
            <span className='date'>{weather.applicable_date}</span>
            <span className='place'>{place}</span>
        </aside>
      )
    }else{
      return(
        <p>loading...</p>
      )
    }
}

export default Home