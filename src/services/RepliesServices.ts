import { Replies } from "../entity/Replies";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";

export default new class RepliesServices {
 private readonly repliesRepository: Repository<Replies> =
 AppDataSource.getRepository(Replies);

 async create(req: Request, res: Response) {
     try {
        const { content, image, userId, threadId } = req.body;
        const newReplies = await this.repliesRepository.create({
            content,
            image,
            userId,
            threadId
        })
        await this.repliesRepository.save(newReplies)
        return res.status(200).json({
            message: "success",
            data: newReplies
        })
     }
     catch (error) {
         return res.status(500).json({ message: "error creating data", error });
     }
 }

  async findOne(req: Request, res: Response): Promise<Response> {
      try{
        const id = Number(req.params.id)
        const replies = await this.repliesRepository.findOne({
            where: {
                id,
            },
            relations: ["user"]
            
            
      })
      if (!replies){
        return res.status(404).json({ message: "data not found" });
      }
      return res.status(200).json({
          message: "success",
          data: replies

      })
      }catch(error) {
          return res.status(500).json({ message: "error getting data by id", error });
      }
  }

}