import express from "express";
import { addComment, getComments } from "../controllers/comment.js";

const route = express.Router();

route.get("/", getComments);
route.post("/", addComment);

export default route;