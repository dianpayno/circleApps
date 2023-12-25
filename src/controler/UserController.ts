import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { registerSchema } from "../utils/validator/UserValidator";

export default new (class Usercontroller {
  find(req: Request, res: Response) {
    UserServices.find(req, res);
  }
  findOne(req: Request, res: Response) {
    UserServices.findOne(req, res);
  }
  async create(req: Request, res: Response) {
    UserServices.create(req, res);
  }


})();
