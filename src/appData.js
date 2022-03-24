import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const grndID = "3s61Mf0HvqudWXXjv2QzUCnq";
const token = "4HdIuPVGzhmwm0lqFw4x9uuGBh11G4E8ydvSmDH";
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export default async function appData() {
  let assets;
  let air;
  let markerColor;
  let pollution = [];
  try {
    const getData = await axios.get(
      `https://api.allthingstalk.io/ground/${grndID}/devices?includeAssets=true`,
      config
    );

    const items = await getData.data.items;
    assets = items.map((item) => {
      return item.assets;
    });

    air = assets.map((asset) => {
      let airQ = asset.find((a) => a.name === "air-quality");
      let loc = asset.find((a) => a.name === "location");
      let pm2_5 = asset.find((a) => a.name === "pm2-5");
      let pm1 = asset.find((a) => a.name === "pm1");
      let pm10 = asset.find((a) => a.name === "pm10");

      if (airQ) {
        if (airQ.state?.value === "Excellent") {
          markerColor = "#00ff00";
        } else if (airQ.state?.value === "Good") {
          markerColor = "#00ced1";
        } else if (airQ.state?.value === "Acceptable") {
          markerColor = "#ffff00";
        } else if (airQ.state?.value === "Moderate") {
          markerColor = "#eb8603";
        } else if (airQ.state?.value === "Polluted") {
          markerColor = "#9370db";
        } else if (airQ.state?.value === "Very Polluted") {
          markerColor = "#ff0000";
        } else {
          markerColor = "#777777";
        }
      }

      pollution = [
        pm2_5 ? pm2_5.state?.value : 0,
        pm1 ? pm1.state?.value : 0,
        pm10 ? pm10.state?.value : 0,
      ].reduce((tot, num) => tot + num);

      return {
        id: airQ ? airQ.deviceId : uuidv4(),
        airQt: airQ ? airQ.state?.value : "no data",
        pos: {
          lat: loc ? loc.state?.value.latitude : null,
          lng: loc ? loc.state?.value.longitude : null,
        },
        pollution,
        markerColor,
      };
    });
  } catch (error) {
    console.log(error);
  }
  return air;
}
