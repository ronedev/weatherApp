import React, { useContext, useState } from 'react'
import searchIcon from 'img/icon/search.png'
import closeIcon from 'img/icon/cerrar.png'
import { geoContext } from 'components/context/geoContext'
import { api } from 'api'

const Search = ({ visibility, setVisibility }) => {

    const GeoContext = useContext(geoContext)

    const [inputLocation, setInputLocation] = useState(null)
    const [locations, setLocations] = useState(null)

    const [desactiveSearch, setDesactiveSearch] = useState(false)

    const getLocations = (e) => {
        e.preventDefault()
        // fetch(`http://localhost:3002/get/country/${inputLocation}`)
        api.get(`search/?query=${inputLocation}`)
            .then(res => {
                // console.log(res.data)
                setLocations(res.data)
            })
            // .then(res => setLocations(res))
            .catch(err => console.error(`Ha ocurrido un problema al obtener las localidades: ${err}`))
    }

    return (
        <aside className={visibility ? 'searchContainer active' : desactiveSearch ? 'searchContainer desactive' : 'searchContainer'}>
            <section className='topSection'>
                <form className='btnSearch' onSubmit={(e) => getLocations(e)}>
                    <input type="text" placeholder='search location' onChange={(e) => setInputLocation(e.target.value)} />
                    <button type='submit' style={!inputLocation ? {cursor: 'no-drop'} : {cursor: 'pointer'}}><img src={searchIcon} alt="searchIcon" /></button>
                </form>
                <div className='close'>
                    <button className='btn2' onClick={() => {
                        setVisibility(false)
                        setDesactiveSearch(true)
                    }}><img src={closeIcon} alt="closeIcon" /></button>
                </div>

            </section>
            <section className='countrysSection'>
                <div className='countrysContainer'>
                    {locations && locations.map(location => {
                        return (
                            <div className='country' onClick={()=>{
                                GeoContext.updateLocation(location.latt_long.split(','))
                                setVisibility(false)
                                setDesactiveSearch(true)
                            }}>
                                <h2>{location.title}</h2>
                                <span>{'>'}</span>
                            </div>
                        )
                    })}
                </div>
            </section>
        </aside>
    )
}

export default Search