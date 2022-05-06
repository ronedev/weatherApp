import React, { useContext, useEffect, useRef, useState } from "react";
import searchIcon from "img/icon/search.png";
import closeIcon from "img/icon/cerrar.png";
import { Ping } from "@uiball/loaders";
import { geoContext } from "components/context/geoContext";
import { api } from "api";
import { loadingContext } from "components/context/loadingContext";
import toast from "react-hot-toast";

const Search = ({ visibility, setVisibility, placeActual }) => {
  const GeoContext = useContext(geoContext);
  const LoadingContext = useContext(loadingContext);

  const [inputLocation, setInputLocation] = useState(null);
  const [locations, setLocations] = useState(null);

  const [desactiveSearch, setDesactiveSearch] = useState(false);

  const [loadingSearch, setLoadingSearch] = useState(false);

  const inputRef = useRef(null);
  
  const getLocations = (e) => {
    e.preventDefault();
    setLoadingSearch(true);
    // fetch(`http://localhost:3002/get/country/${inputLocation}`)
    api
      .get(`search/?query=${inputLocation}`)
      .then((res) => {
        // console.log(res.data)
        setLocations(res.data.length > 0 ? res.data : ['No locations'] );
        setLoadingSearch(false);
      })
      // .then(res => setLocations(res))
      .catch((err) => {
        console.error(
          `Ha ocurrido un problema al obtener las localidades: ${err}`
        );
        setLoadingSearch(false);
      });
  };

  useEffect(() => {
    if (inputRef.current && visibility) {
      inputRef.current.focus();
    }
  }, [visibility]);
  return (
    <aside
      className={
        visibility
          ? "searchContainer active"
          : desactiveSearch
            ? "searchContainer desactive"
            : "searchContainer"
      }
    >
      <section className="topSection">
        <form className="btnSearch" onSubmit={(e) => getLocations(e)}>
          <input
            autoFocus
            ref={inputRef}
            type="text"
            placeholder="search location"
            value={inputLocation}
            onChange={(e) => {
              setInputLocation(e.target.value);
            }}
          />
          <button
            type="submit"
            style={
              !inputLocation ? { cursor: "no-drop" } : { cursor: "pointer" }
            }
          >
            <img src={searchIcon} alt="searchIcon" />
          </button>
        </form>
        <div className="close">
          <button
            className="btn2"
            onClick={() => {
              setInputLocation("");
              setLocations(null);
              setVisibility(false);
              setDesactiveSearch(true);
            }}
          >
            <img src={closeIcon} alt="closeIcon" />
          </button>
        </div>
      </section>
      {loadingSearch && (
        <div className="loadingSearchContainer">
          <Ping color="#100E1D" size={120} speed={1.2} />
        </div>
      )}
      <section className="countrysSection">
        <div className="countrysContainer">
          {locations &&
            locations.map((location, idx) => {
              return (
                <>
                  {location === 'No locations' ? (
                    <>
                      <p>No matching locations found</p>
                    </>
                  ) : idx < 10 &&(
                    <>
                      <div
                        className="country"
                        onClick={() => {
                            if(location.title !== placeActual){
                                LoadingContext.setLoading(true)
                                GeoContext.updateLocation(
                                  location.latt_long.split(",")
                                );
                                setInputLocation("");
                                setLocations(null);
                                setVisibility(false);
                                setDesactiveSearch(true);
                            }else{
                                console.log('actual')
                                toast('The selected location is the current one', {
                                    icon: '🌍'
                                })
                                setInputLocation("");
                                setLocations(null);
                                setVisibility(false);
                                setDesactiveSearch(true);
                            }
                        }}
                      >
                        <h2>{location.title}</h2>
                        <span>{">"}</span>
                      </div>
                    </>
                  )}
                </>
              );
            })}
        </div>
      </section>
    </aside>
  );
};

export default Search;
