import {Request, Response} from "express";
import LikeServices from "../services/LikeServices";

export default new class LikeController {
    create(req: Request, res: Response) {
        LikeServices.create(req, res)
    }
    delete(req: Request, res: Response) {
        LikeServices.delete(req, res)
    }

    findAll(req: Request, res: Response) {
        LikeServices.findAll(req, res)
    }

    findOne(req: Request, res: Response) {
        LikeServices.findOne(req, res)
    }
}
