import { Request, Response } from "express";
import RepliesServices from "../services/RepliesServices";

export default  new class RepliesController {
    create(req: Request, res: Response) {
        RepliesServices.create(req, res)
    }
    findOne(req: Request, res: Response) {
        RepliesServices.findOne(req, res)
    }

}