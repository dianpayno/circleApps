import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv"
dotenv.config()


export default new class AuthMiddleware {
    authenticate(req: Request, res: Response, next: NextFunction) {
        const authenticationHeader = req.headers.authorization;
        if (!authenticationHeader || !authenticationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authenticationHeader.split(" ")[1];

        try{
            const payload = jwt.verify(token, process.env.PRIVATE_KEY as string)
            res.locals.payload = payload
            next();
        }
        catch(error){
            return res.status(401).json({ message: "token invalid" });
        }
       
    }

}