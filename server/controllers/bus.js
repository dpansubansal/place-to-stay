import { Bus } from "../models/citybus/Bus.js";
import { Route } from "../models/citybus/Route.js";
import { Location } from "../models/citybus/Locations.js";

export const ShowBus = async (req, res) => {
  try {
    const buses = await Bus.find();
    console.log("buses", buses);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const ShowRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    console.log("routes", routes);
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const ShowLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const addLocation = async (req, res) => {
  const { name, lat, lng } = req.body;
  console.log("me run??", name, lat, lng);

  try {
    const newLocation = new Location({
      name,
      lat,
      lng,
    });

    await newLocation.save();

    res.status(200).json({ message: "Location added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving location", error: error.message });
  }
};
export const addRoute = async (req, res) => {
  const { name, waypoints } = req.body;
  console.log("me run??", name, waypoints);

  try {
    const newRoute = new Route({
      name,
      waypoints,
    });

    await newRoute.save();

    res.status(200).json({ message: "Location added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving location", error: error.message });
  }
};
export const addBus = async (req, res) => {
  const { busNumber, route } = req.body;
  console.log("rins?")

  try {
    const newBus = new Bus({
      busNumber,
      route,
    });

    await newBus.save();

    res.status(200).json({ message: "Bus added successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving location", error: error.message });
  }
};
