import FollowsController from "../controler/FollowsController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeFollows = Router();

routeFollows.post("/follows", AuthMiddleware.authenticate, FollowsController.create);
routeFollows.get("/follows/:id", FollowsController.findOne);
routeFollows.get("/follows", FollowsController.findAll);
routeFollows.delete("/follows/:id", AuthMiddleware.authenticate,  FollowsController.delete);

export default routeFollows