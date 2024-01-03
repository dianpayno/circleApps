import UserController from "../controler/UserController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeUser = Router();

routeUser.get("/users",AuthMiddleware.authenticate, UserController.find)
routeUser.get("/detailuser",AuthMiddleware.authenticate, UserController.findOne)
routeUser.get("/detailusers/:id",AuthMiddleware.authenticate, UserController.findOneUser)
routeUser.post("/users", UserController.create)
routeUser.get("/suggest", AuthMiddleware.authenticate, UserController.suggestUsers)
routeUser.put("/editprofile", AuthMiddleware.authenticate, UserController.update)



export default routeUser