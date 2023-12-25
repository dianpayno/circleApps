import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Follows } from "../entity/Follows";


export default new (class FollowsServices {
    private readonly followsRepository: Repository<Follows> =
        AppDataSource.getRepository(Follows);

    async create(req: Request, res: Response) {
        try {
            const { userId, followingId} = req.body;
            const newFollows = await this.followsRepository.create({
               userId,
               followingId
             
            })
            await this.followsRepository.save(newFollows)
            return res.status(200).json({
                message: "success",
                data: newFollows
            })
        }
        catch (error) {
            return res.status(500).json({ message: "error creating data", error });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try{
            const id = Number(req.params.id)
            const follows = await this.followsRepository.findOne({
                where: {
                    id,
                },
                relations: ["user", "following"]
          })
          if (!follows){
            return res.status(404).json({ message: "data not found" });
          }
          return res.status(200).json({
              message: "success",
              data: follows})
    }catch(error) {
            return res.status(500).json({ message: "error getting data by id", error });
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const follows = await this.followsRepository.find(
                {
                    relations: ["user", "following"]
                }
            )
            return res.status(200).json({
                message: "success",
                data: follows
            })
        } catch (error) {
            return res.status(500).json({ message: "error saat fetch data", error });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const follows = await this.followsRepository.delete({
                id
            })    
            return res.status(200).json({
                message: "success",
                data: follows
            })        
        } catch (error) {
            return res.status(500).json({ message: "error saat delete data", error });
            
        }
    }
})