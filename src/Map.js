import React, { useState, Fragment } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function Map(props) {
  const [mapRef, setMapRef] = useState(null);
  const center = { lat: 44.799378, lng: 20.455177 };
  const zoom = 13;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCz3ZsXnGGp9uQnPuIrFt9aXGpDOv_Gxeo",
  });

  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    props.airData.map((place) => {
      bounds.extend(place.pos);
      return place.id;
    });
    map.fitBounds(bounds);
  };

  const loadHandler = (map) => {
    setMapRef(map);

    fitBounds(map);
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
      <Fragment>
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
                <h3>Air quality</h3>
                <p>{selectedPlace.airQt}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export default Map;
