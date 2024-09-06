import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SaveBus = () => {
  const [busNo, setBusNo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState("");

  // Fetch the routes when the component mounts
  useEffect(() => {
    const getRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/bus/routes");
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    getRoutes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/bus/add-bus", {
        busNumber: busNo,
        route: route,
      });
      console.log("Response:", response);
      alert("Bus saved successfully!");

      // Reset the form after successful submission
      setRoute("");
      setBusNo("");
    } catch (error) {
      console.error("Error saving Bus:", error);
      alert("Failed to save the bus. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Bus Number input */}
        <TextField
          label="Bus Number"
          variant="outlined"
          fullWidth
          value={busNo}
          onChange={(e) => setBusNo(e.target.value)}
          required
          margin="normal"
        />

        {/* Route selection */}
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="route-label">Route</InputLabel>
          <Select
            labelId="route-label"
            value={route}
            onChange={(event) => setRoute(event.target.value)}
            label="Route"
          >
            {routes.length === 0 ? (
              <MenuItem disabled>No routes available</MenuItem>
            ) : (
              routes.map((route) => (
                <MenuItem key={route._id} value={route._id}>
                  {route.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        {/* Save button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </form>
    </div>
  );
};

export default SaveBus;
