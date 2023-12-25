import RepliesController from "../controler/RepliesController";
import { Router } from "express";

const routeReplies = Router();

routeReplies.post("/replies", RepliesController.create);
routeReplies.get("/replies/:id", RepliesController.findOne);

export default routeReplies