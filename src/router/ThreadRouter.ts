import ThreadController from "../controler/ThreadController";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware";

const routeThread = Router();   

routeThread.get("/threads", ThreadController.find)
routeThread.get("/threads/:id", ThreadController.findOne)
routeThread.post("/threads", AuthMiddleware.authenticate,ThreadController.create)
routeThread.get("/mythreads",AuthMiddleware.authenticate, ThreadController.findmyThread)
routeThread.get("/userthreads/:id",AuthMiddleware.authenticate, ThreadController.findSpesificThread)
routeThread.put("/threads/:id", ThreadController.update)
routeThread.delete("/threads/:id", ThreadController.delete)


export default routeThread