import UserController from "../controler/UserController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeUser = Router();

routeUser.get("/users", UserController.find)
routeUser.get("/users/:id",AuthMiddleware.authenticate, UserController.findOne)
routeUser.post("/users", UserController.create)


export default routeUser