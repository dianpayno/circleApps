import { User } from "../entity/User";
import { Follows } from "../entity/Follows";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import {
  registerSchema,
  editProfileSchema,
} from "../utils/validator/UserValidator";
import * as jwt from "jsonwebtoken";
import { log } from "console";

export default new (class userServices {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);

  private readonly followsRepository: Repository<Follows> =
    AppDataSource.getRepository(Follows);

  async find(req: Request, res: Response) {
    try {
      const id = res.locals.payload.user.id;
      const user = await this.userRepository.find({
        relations: ["threads", "follows", "following", "likes"],
      });

      const data = user.map((user) => {
        return {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          avatar: user.profile_picture,
          bio: user.profile_description,
          // threads: user.threads,
          // following: user.follows,
          // followers: user.following,
          // likes: user.likes,
        };
      });

      const newdata = data.filter((data) => data.id !== id);

      return res.status(200).json({
        message: "succes",
        data: newdata,
      });
    } catch (error) {
      return res.status(500).json({ message: "error saat fetch data", error });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const userId= res.locals.payload.user.id
      const user = await this.userRepository.findOne({
        where: {
          id: userId,
        },
        relations: ["follows", "following", "threads", "likes"],
      });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      const newData = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        profile_picture: user.profile_picture,
        profile_description: user.profile_description,
        cover_picture: user.cover_picture,
        threads: user.threads,
        follows: user.follows.length,
        following: user.following.length,
        likes: user.likes,
      };

      return res.status(200).json({
        message: "succes",
        data: newData,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error getting data by id", error });
    }
  }

  async findOneUser(req: Request, res: Response) {
    try {
      const userId= req.params.id
      const loginUser = res.locals.payload.user.id
      const user = await this.userRepository.findOne({
        where: {
          id:Number(userId),
        },
        relations: ["follows", "following", "threads", "likes"],
      });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }

      // console.log(user.following)
      // console.log("ini login user",loginUser)
      const isFollowing = user.following.filter((item:any)=>{
        if (item.userId === loginUser) {
          return item
        }
      })


      const newData = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        profile_picture: user.profile_picture,
        profile_description: user.profile_description,
        cover_picture: user.cover_picture,
        threads: user.threads,
        follows: user.follows.length,
        following: user.following.length,
        likes: user.likes,
        isFollowing: isFollowing.length > 0 ? true : false
      };

      

      return res.status(200).json({
        message: "succes",
        data: newData,
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

  async suggestUsers(req: Request, res: Response) {
    try {
      const id = res.locals.payload.user.id;
      console.log(id);
      const user = await this.userRepository.find({
        relations: ["following"],
      });

      const data = user.map((user) => {
        return {
          id: user.id,
          username: user.username,
          full_name: user.full_name,
          profile_picture: user.profile_picture,
          followers: user.following,
        };
      });

      // const getFollow

      const filterSatu = data.filter((data) => data.id !== id);
      const suggestUser = filterSatu.filter((data) => {
        const contains = data.followers.map((item: any) => item.userId);
        if (contains.includes(id) === false) {
          return data;
        }
      });

      const newData = suggestUser.slice(0, 5)
      const suggestUsers = newData.map((data) => {
        return {
          id: data.id,
          username: data.username,
          full_name: data.full_name,
          profile_picture: data.profile_picture,
          followers: data.followers,
        };
      });

      return res.status(200).json({
        message: "success",
        data: suggestUsers,
      });
    } catch (error) {
      return res.status(500).json({ message: "error saat fetch data", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = res.locals.payload.user.id;
      const newData = req.body;

      const { error, value } = editProfileSchema.validate(newData);

      if (error) return res.status(400).json({ message: error.message });
      const updateUser = await this.userRepository.update(userId, value);
      return res.status(200).json({
        status: 200,
        message: "success",
        data: updateUser,
      });
    } catch (error) {
      return res.status(500).json({ message: "error updating data", error });
    }
  }
})();
