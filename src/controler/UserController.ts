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

  findOneUser(req: Request, res: Response) {
    UserServices.findOneUser(req, res);
  }
  async create(req: Request, res: Response) {
    UserServices.create(req, res);
  }

   suggestUsers(req: Request, res: Response): Promise<Response> {
   return UserServices.suggestUsers(req, res);
  }

  update(req: Request, res: Response) {
    UserServices.update(req, res);
  }

  
})();
