import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export default new (class AuthServices {
  private readonly authRepository: Repository<User> =
    AppDataSource.getRepository(User);
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const userEmail = await this.authRepository.findOne({
        where: {
          email,
        },
      });

      if (!userEmail) {
        return res.status(404).json({ message: "email belum terdaftar" });
      }
      const checkPassword = await bcrypt.compare(password, userEmail.password);
      if (!checkPassword)
        return res.status(404).json({ message: "password salah" });

      const user = this.authRepository.create({
        id: userEmail.id,
      });

      const token = jwt.sign({ user }, process.env.PRIVATE_KEY as string);

      return res.status(200).json({
        message: "login success",
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "error login", error });
    }
  }
})();
