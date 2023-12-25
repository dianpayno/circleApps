import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { registerSchema } from "../utils/validator/UserValidator";
import * as jwt from "jsonwebtoken";

export default new (class userServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  async find(req: Request, res: Response) {
    try {
      const user = await this.userRepository.find({
        relations: ["threads", "follows", "following", "likes"],
      });

      return res.status(200).json({
        message: "succes",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: "error saat fetch data", error });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ["follows", "following", "threads", "likes"],
      });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      return res.status(200).json({
        message: "succes",
        data: user
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error getting data by id", error });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const userReg = req.body;
      const { error, value } = registerSchema.validate(userReg);
      if (error) return res.status(400).json({ message: error.message });
      const checkEmail = await this.userRepository.count({
        where: {
          email: value.email,
        },
      });
      if (checkEmail > 0)
        return res.status(400).json({ message: "email already exist" });
      const hashPassword = await bcrypt.hash(value.password, 10);

      const newUser = this.userRepository.create({
        ...value,
        password: hashPassword,
      });

      const createUser = await this.userRepository.save(newUser);
      res.status(201).json({
        status: 201,
        message: "success",
        data: createUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "error creating data", error });
    }
  }
})();
