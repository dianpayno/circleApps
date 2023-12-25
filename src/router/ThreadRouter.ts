import ThreadController from "../controler/ThreadController";
import { Router } from "express";

const routeThread = Router();   

routeThread.get("/threads", ThreadController.find)
routeThread.get("/threads/:id", ThreadController.findOne)
routeThread.post("/threads", ThreadController.create)
routeThread.put("/threads/:id", ThreadController.update)
routeThread.delete("/threads/:id", ThreadController.delete)


export default routeThread