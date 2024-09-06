import { Router } from "express";
import {
  addBus,
  addRoute,
  ShowBus,
  ShowLocations,
} from "../controllers/bus.js";
import { ShowRoutes } from "../controllers/bus.js";
import { addLocation } from "../controllers/bus.js";

const busRouter = Router();

busRouter.get("/buses", ShowBus);
busRouter.get("/routes", ShowRoutes);
busRouter.get("/locations", ShowLocations);
busRouter.post("/add-location", addLocation);
busRouter.post("/add-route", addRoute);
busRouter.post("/add-bus", addBus);

export default busRouter;
