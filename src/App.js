import React, { useState, useEffect } from "react";
import appData from "./appData";
import "./App.css";
import Map from "./Map";

function App() {
  const [airData, setAirData] = useState([]);

  useEffect(() => {
    appData().then((data) => setAirData(data));
  }, []);

  return (
    <div className="App">
      <h1>Vazduh Gradjanima</h1>
      <Map airData={airData} />
    </div>
  );
}

export default App;
