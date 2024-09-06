import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const SaveLocs = () => {
  const [location, setLocation] = useState({ lat: "", lng: "" });
  const [locationName, setLocationName] = useState("");
  // This function will capture the map click event and update the lat/lng
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setLocation({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });

    return location.lat && location.lng ? (
      <Marker position={[location.lat, location.lng]} />
    ) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sss", location);
    try {
      // Save location data to the database
      const response = await axios.post(
        "http://localhost:5000/bus/add-location",
        {
          name: locationName,
          lat: location.lat,
          lng: location.lng,
        }
      );
      console.log("res",response)
      alert("Location saved successfully!");
      setLocation({ lat: "", lng: "" });
      setLocationName("");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };
  return (
    <div>
      <h2>Add New Location</h2>
      <div style={{ height: "400px" }}>
        <MapContainer
          center={[26.25578, 73.00076]}
          zoom={13}
          style={{ height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Location Name"
          variant="outlined"
          fullWidth
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Latitude"
          variant="outlined"
          value={location.lat}
          fullWidth
          InputProps={{ readOnly: true }}
          required
          margin="normal"
        />
        <TextField
          label="Longitude"
          variant="outlined"
          value={location.lng}
          fullWidth
          InputProps={{ readOnly: true }}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default SaveLocs;
