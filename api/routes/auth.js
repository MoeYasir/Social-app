import express from "express";
import { login, register, logout } from "../controllers/auth.js";

const route = express.Router();

route.post("/login", login);
route.post("/register", register);
route.post("/logout", logout);

export default route;