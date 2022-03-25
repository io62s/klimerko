import React from "react";

function Polluted(props) {
  const { lat, lng } = props.air.pos;
  return (
    <h3>
      The most polluted air location - lat: {lat} lng: {lng}
    </h3>
  );
}

export default Polluted;
