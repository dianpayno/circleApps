import RepliesController from "../controler/RepliesController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeReplies = Router();

routeReplies.post("/replies",AuthMiddleware.authenticate, RepliesController.create);
routeReplies.get("/replies/:id", AuthMiddleware.authenticate, RepliesController.findOne);

export default routeReplies