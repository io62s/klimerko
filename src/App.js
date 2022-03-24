import React, { useState, useEffect } from "react";
import appData from "./appData";
import "./App.css";
import Map from "./Map";

function App() {
  const [airData, setAirData] = useState([]);
  const [mostPollutedAir, setMostPollutedAir] = useState(null);

  useEffect(() => {
    appData().then(async (data) => {
      setAirData(data);

      let pollutedAirData = await data;
      let sortedAirData = pollutedAirData.sort(
        (a, b) => b.pollution - a.pollution
      );
      return setMostPollutedAir(sortedAirData[0]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Vazduh Gradjanima</h1>
      <h3>
        The most polluted air on location - lat:{" "}
        {mostPollutedAir && mostPollutedAir.pos.lat} lng:{" "}
        {mostPollutedAir && mostPollutedAir.pos.lng}
      </h3>
      <Map airData={airData} />
    </div>
  );
}

export default App;
