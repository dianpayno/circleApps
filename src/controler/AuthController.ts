import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default new (class AuthController {
  async login(req: Request, res: Response) {
    AuthServices.login(req, res);
  }
})();
