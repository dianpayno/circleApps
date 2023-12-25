import { Thread } from "../entity/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";


export default new (class ThreadServices {
  private readonly threadRepository: Repository<Thread> =
    AppDataSource.getRepository(Thread);


  async findAll(req: Request, res: Response) {
    try {
      const threads = await this.threadRepository.find(
        { relations: ["user", "replies", "likes"], 
      order: {
        posted_at: "DESC",
      }
      },);

     
      return res.status(200).json({
        message: "success",
        data: threads,
      });
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
})();
