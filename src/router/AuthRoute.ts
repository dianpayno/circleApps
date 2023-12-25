import AuthController from "../controler/AuthController";
import { Router } from "express";

const routeAuth = Router();

routeAuth.post("/auth/login", AuthController.login);

export default routeAuth;
