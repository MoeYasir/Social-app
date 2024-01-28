import express from "express";
import { getUser, updateUser } from "../controllers/user.js";

const route = express.Router();

route.get("/find/:userId", getUser);
route.put("/", updateUser);


export default route;