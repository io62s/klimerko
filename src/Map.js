import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function Map(props) {
  const center = { lat: 44.7952986, lng: 20.4762301 };
  const zoom = 12.5;
  const [, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
<<<<<<< HEAD
    googleMapsApiKey: "AIzaSyC_2TGpK0fBp_fZQgU9b5gmmmXsI3vABjA",
=======
    googleMapsApiKey: "",
>>>>>>> a9d7dced6a4c17be96152a65b8030748c443bf94
  });

  const loadHandler = (map) => {
    setMapRef(map);
  };

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);
  };

  const renderMap = () => {
    return (
      <GoogleMap
        onLoad={loadHandler}
        center={center}
        zoom={zoom}
        mapContainerStyle={{
          height: "100%",
          width: "100%",
        }}>
        {props.airData.map((place) => (
          <Marker
            key={place.id}
            position={place.pos}
            onLoad={(marker) => {
              const customIcon = (opts) =>
                Object.assign(
                  {
                    path: "M7.8,1.3L7.8,1.3C6-0.4,3.1-0.4,1.3,1.3c-1.8,1.7-1.8,4.6-0.1,6.3c0,0,0,0,0.1,0.1 l3.2,3.2l3.2-3.2C9.6,6,9.6,3.2,7.8,1.3C7.9,1.4,7.9,1.4,7.8,1.3z M4.6,5.8c-0.7,0-1.3-0.6-1.3-1.4c0-0.7,0.6-1.3,1.4-1.3 c0.7,0,1.3,0.6,1.3,1.3 C5.9,5.3,5.3,5.9,4.6,5.8z",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    scale: 3,
                  },
                  opts
                );

              marker.setIcon(
                customIcon({
                  fillColor: place.markerColor,
                  strokeColor: "black",
                })
              );
              return markerLoadHandler(marker, place);
            }}
            onClick={(event) => markerClickHandler(event, place)}
          />
        ))}

        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.id]}
            onCloseClick={() => setInfoOpen(false)}>
            <div>
              <h2>Air quality</h2>
              <h4>{selectedPlace.airQt}</h4>
              <p>lat:{selectedPlace.pos.lat}</p>
              <p>lng:{selectedPlace.pos.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  };

  return isLoaded ? renderMap() : <h1>Loading Map...</h1>;
}

export default Map;
