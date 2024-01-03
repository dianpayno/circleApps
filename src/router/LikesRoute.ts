import LikeController from "../controler/LikeController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";


const routeLikes = Router();

routeLikes.post("/likes", AuthMiddleware.authenticate, LikeController.create);
routeLikes.delete("/likes/:id",AuthMiddleware.authenticate, LikeController.delete);
routeLikes.get("/likes", LikeController.findAll);
routeLikes.get("/likes/:id", LikeController.findOne);

export default routeLikes