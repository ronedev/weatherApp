import React, { useContext } from 'react'
import windDirection from 'img/icon/direction.png'
import { geoContext } from 'components/context/geoContext'
import Loading from 'components/loading/Loading'

const Header = ({ weather }) => {

    const GeoContext = useContext(geoContext)

    const formatDate = (date) => {
        const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let newDate = new Date(date)
        newDate = days[newDate.getDay()] + ' , ' + (newDate.getDate() + 1) + ' ' + month[newDate.getMonth()]
        return newDate
    }

    if (weather) {
        return (
            <section className='header'>
                <div className='celsiusFahrenheitBtnContainer'>
                    <button className={GeoContext.escalaTemperatura === 'celsius' ? 'btn3 selected' : 'btn3'} onClick={() => GeoContext.changeEscalaTemperatura('celsius')}>ºC</button>
                    <button className={GeoContext.escalaTemperatura === 'fahrenheit' ? 'btn3 selected' : 'btn3'} onClick={() => GeoContext.changeEscalaTemperatura('fahrenheit')}>ºF</button>
                </div>
                <div className='nextDaysGrid'>
                    {weather.map((day, idx) => {
                        if (idx > 0) {
                            return (
                                <div className='nextDayContainer'>
                                    <h3>{idx === 1 ? 'Tomorrow' : formatDate(day.applicable_date)}</h3>
                                    <img src={`https://www.metaweather.com/static/img/weather/png/${day.weather_state_abbr}.png`} alt="weatherIcon" />
                                    <div className='temperatureContainer'>
                                        <p className='max'>
                                            { GeoContext.escalaTemperatura === 'celsius' ? Math.round(day.max_temp) : (((Math.round(day.max_temp * (9/5)))) + 32) }
                                            <span> {GeoContext.escalaTemperatura === 'celsius' ? 'ºC' : 'ºF'}</span>
                                        </p>
                                        <p className='min'>
                                            {GeoContext.escalaTemperatura === 'celsius' ? Math.round(day.min_temp) : (((Math.round(day.min_temp * (9/5)))) + 32)}
                                            <span> {GeoContext.escalaTemperatura === 'celsius' ? 'ºC' : 'ºF'}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <section className='todayHightlights'>
                    <h2>Today's highlights</h2>
                    <div className='cardsContainer'>
                        <div className='infoCard'>
                            <h4>Wind state</h4>
                            <span className='windStatus'>{Math.round(weather[0].wind_speed)} <p>mph</p></span>
                            <span className='windDirection'><img src={windDirection} alt="windIcon" style={{ 'transform': `rotate(${Math.round(weather[0].wind_direction)}deg)` }} />{weather[0].wind_direction_compass} </span>
                        </div>
                        <div className='infoCard'>
                            <h4>Humidity</h4>
                            <span className='humidity'>{weather[0].humidity}<p> %</p></span>
                            <div className='progressContainer'>
                                <progress max="100" id='humidity' value={weather[0].humidity}></progress>
                                <label htmlFor='humidity'><span>0</span> <span>100%</span></label>
                            </div>
                        </div>
                        <div className='infoCard'>
                            <h4>Visibility</h4>
                            <span className='visibility'>{Math.round(weather[0].visibility * 10) / 10} <p> millas</p></span>
                        </div>
                        <div className='infoCard'>
                            <h4>Air pressure</h4>
                            <span className='airPressure'>{Math.round(weather[0].air_pressure)} <p> mb</p></span>
                        </div>
                    </div>
                </section>
                <span className='footer'>Created by <a href="https://ronedev.com/">Agustin Vera</a> · devChallenges.io</span>
            </section>
        )
    } else {
        <Loading />
    }
}

export default Header