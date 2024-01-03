import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import QuequeServices from "../services/QuequeServices";


export default new class  Threadcontroller {
    find(req: Request, res: Response) {
        ThreadServices.findAll(req, res)
    }
    findOne(req: Request, res: Response) {
        ThreadServices.findOne(req, res)
    }
    // create(req: Request, res: Response) {
    //     ThreadServices.create(req, res)
    // }

    create(req: Request, res: Response) {
        QuequeServices.createThreads(req, res)
    }
    update(req: Request, res: Response) {
        ThreadServices.update(req, res)
    }
    delete(req: Request, res: Response) {
        ThreadServices.delete(req, res)
    }

    findmyThread(req: Request, res: Response) {
        ThreadServices.findmyThread(req, res)
    }

    findSpesificThread(req: Request, res: Response) {
        ThreadServices.findSpesificThread(req, res)
    }
}
