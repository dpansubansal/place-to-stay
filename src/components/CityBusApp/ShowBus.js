import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { Icon } from "leaflet";
import ic from "../../assets/bus-icon.png";

// Create a Leaflet icon using your custom image
const busIcon = new Icon({
  iconUrl: ic,
  iconSize: [25, 25], // Adjust size as needed
});

function ShowBus() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState({});

  useEffect(() => {
    const fetchBuses = async () => {
      const response = await axios.get("http://localhost:5000/bus/buses");
      setBuses(response.data);

      // Fetch the routes for each bus
      const routeIds = response.data.map((bus) => bus.route);
      const routeResponses = await axios.get(
        `http://localhost:5000/bus/routes`,
        {
          params: { ids: routeIds.join(",") },
        }
      );
      console.log("routeResponses", routeResponses);
      const routesMap = routeResponses.data.reduce((acc, route) => {
        acc[route._id] = route.waypoints;
        return acc;
      }, {});
      console.log("routesMap", routesMap);
      setRoutes(routesMap);
    };

    fetchBuses();
  }, []);

  return (
    <>
      <div style={{ height: "60vh" }}>
        <MapContainer
          center={[26.25578, 73.00076]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {buses.map((bus) => (
            <React.Fragment key={bus._id}>
              <Marker position={[bus.lat, bus.lng]} icon={busIcon}>
                <Popup>
                  Bus Number: {bus.busNumber} <br /> Route: {bus.route.name}
                </Popup>
              </Marker>
              {routes[bus.route] && (
                <Polyline positions={routes[bus.route]} color="blue" />
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default ShowBus;
