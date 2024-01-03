import { Thread } from "../entity/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { createClient } from "redis";



export default new (class ThreadServices {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);


  async findAll(req: Request, res: Response) {
    try {

      const client = createClient();
      client.on("error", (err) => console.log("Redis Client Error", err));
     await client.connect();
     const threads = await client.get("threads");
  

     if (threads){
      await client.del("threads");
      return res.status(200).json({
        message: "success",
        data: JSON.parse(threads)
      })
     
     } else {
      const data = await this.threadRepository.find({
        relations: ["user", "replies", "likes"],
        order: {
          posted_at: "DESC",
        },

      })
      await client.setEx("threads", 1, JSON.stringify(data));
      return res.status(200).json({
        message: "success",
        data: data,
      });
     
    
    }
    } catch (error) {
      return res.status(500).json({ message: "error saat fetch data", error });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const thread = await this.threadRepository.findOne({ 
        where: {
          id
        },
        relations: ["user", "replies", "likes"],
      });
      if (!thread) {
        return res.status(404).json({ message: "data not found" });
      }
      

      return res.status(200).json({
        message: "success",
        data: thread,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error getting data by id", error });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const { content, image, userId } = req.body;
      const newThread = await this.threadRepository.create({
        content,
        image,
        userId
      });

      await this.threadRepository.save(newThread);
      return res.status(200).json({
        message: "success",
        data: newThread,
      });
    } catch (error) {
      return res.status(500).json({ message: "error creating data", error });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { content, image } = req.body;
      const thread = await this.threadRepository.findOneBy({ id });
      if (!thread) {
        return res.status(404).json({ message: "data not found" });
      }
      await this.threadRepository.update({ id }, { content, image });
    } catch (error) {
      return res.status(500).json({ message: "error updating data", error });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const thread = await this.threadRepository.findOne({
        where:{
          id
        },
      });
      if (!thread) {
        return res.status(404).json({ message: "data not found" });
      }
      await this.threadRepository.delete({ id });
      return res.status(200).json({
        message: "success",
        data: thread,
      })
    } catch (error) {
      return res.status(500).json({ message: "error deleting data", error });
    }
  }

  async findmyThread(req: Request, res: Response) {
    try {
      const userId =res.locals.payload.user.id;
      const threads = await this.threadRepository.find({
        where: {
          userId: userId,

        },
        relations: ["user", "replies", "likes"],
        order: {
          posted_at: "DESC",
        }
      });
      if (!threads) {
        return res.status(404).json({ message: "data not found" });
      }
      return res.status(200).json({
        message: "success",
        data: threads,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error getting data by id", error });
    }
  }

  async findSpesificThread(req: Request, res: Response) {
    try {
      const {id}  = req.params
      console.log(id)
      const threads = await this.threadRepository.find({
        where: {
          userId:Number(id)

        },
        relations: ["user", "replies", "likes"],
        order: {
          posted_at: "DESC",
        }
      });
      if (!threads) {
        return res.status(404).json({ message: "data not found" });
      }
      return res.status(200).json({
        message: "success",
        data: threads,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "error getting data by id", error });
    }
  }

 
})();
