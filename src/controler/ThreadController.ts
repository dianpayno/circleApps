import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";


export default new class  Threadcontroller {
    find(req: Request, res: Response) {
        ThreadServices.findAll(req, res)
    }
    findOne(req: Request, res: Response) {
        ThreadServices.findOne(req, res)
    }
    create(req: Request, res: Response) {
        ThreadServices.create(req, res)
    }
    update(req: Request, res: Response) {
        ThreadServices.update(req, res)
    }
    delete(req: Request, res: Response) {
        ThreadServices.delete(req, res)
    }
}
