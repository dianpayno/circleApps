import LikeController from "../controler/LikeController";
import { Router } from "express";


const routeLikes = Router();

routeLikes.post("/likes", LikeController.create);
routeLikes.delete("/likes/:id", LikeController.delete);
routeLikes.get("/likes", LikeController.findAll);
routeLikes.get("/likes/:id", LikeController.findOne);

export default routeLikes