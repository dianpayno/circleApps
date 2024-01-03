import FollowsController from "../controler/FollowsController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeFollows = Router();

routeFollows.post("/follows", AuthMiddleware.authenticate, FollowsController.create);
routeFollows.get("/follows/:id", AuthMiddleware.authenticate, FollowsController.findOne);
routeFollows.get("/followers", AuthMiddleware.authenticate, FollowsController.getDataFollowers);
routeFollows.get("/following", AuthMiddleware.authenticate, FollowsController.getDataFollowing);
routeFollows.get("/follows", AuthMiddleware.authenticate, FollowsController.findAll);
routeFollows.delete("/follows/:id", AuthMiddleware.authenticate,  FollowsController.delete);

export default routeFollows