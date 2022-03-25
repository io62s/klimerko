import React, { useState, useEffect } from "react";
import appData from "./appData";
import "./App.css";
import Map from "./Map";
import Polluted from "./Polluted";

function App() {
  const [airData, setAirData] = useState([]);
  const [mostPollutedAir, setMostPollutedAir] = useState(null);

  useEffect(() => {
    appData().then(async (data) => {
      setAirData(data);

      let pollutedAirData = await data;
      let sortedAirData = pollutedAirData
        .filter((data) => data.airQt !== undefined)
        .sort((a, b) => b.pollution - a.pollution);
      console.log(sortedAirData);
      return setMostPollutedAir(sortedAirData[0]);
    });
  }, []);

  return (
    <div className="App">
      <h1>Vazduh Gradjanima</h1>
      {mostPollutedAir && <Polluted air={mostPollutedAir} />}
      <Map airData={airData} />
    </div>
  );
}

export default App;
