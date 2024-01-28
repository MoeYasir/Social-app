import express from "express";
import { getrelationships, addrelationship, deleterelationship } from "../controllers/relationship.js";

const route = express.Router();

route.get("/", getrelationships);
route.post("/", addrelationship);
route.delete("/", deleterelationship);

export default route;