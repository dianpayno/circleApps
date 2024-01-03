import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Follows } from "../entity/Follows";
import { User } from "../entity/User";
import UserServices from "./UserServices";
import { log } from "console";
import { boolean } from "joi";


export default new (class FollowsServices {
    private readonly followsRepository: Repository<Follows> =
        AppDataSource.getRepository(Follows);

        private readonly userRepository: Repository<User> =
        AppDataSource.getRepository(User);
    

    async create(req: Request, res: Response) {
        try {
            const { followingId} = req.body;
            const userId = res.locals.payload.user.id;
            const newFollows = await this.followsRepository.create({
               userId,
               followingId,
             
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
                relations: ["user", "following", "follows"]
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

    async getDataFollowers (req: Request, res: Response): Promise<Response> {
        try {
            const id = res.locals.payload.user.id
            
            const dataFollowers = await this.followsRepository.find({
                where: {
                    followingId: id
                },
                relations: ["user", "following"]
            })
      
            const test = await Promise.all(
                dataFollowers.map(async(item)=>{
                    let isFollowing=false
                   const cekData = await this.followsRepository.count({
                       where:{
                            userId: id,
                            followingId: item.userId
                       }
                   })
    
                   if (cekData > 0) {
                       isFollowing = true
                   }
                
    
                   return {
                       id: item.id,
                       userId: item.userId,
                       followingId: item.followingId,
                       user: item.user,
                       isFollowing
                   }
                })              
            )
            
            
            return res.status(200).json({
                message: "success",
                data: test
               
               
                
                

            })
        } catch (error) {
            return res.status(500).json({ message: "error saat fetch data", error });
        }
    }

    async getDataFollowing (req: Request, res: Response): Promise<Response> {
        try {
            const userId = res.locals.payload.user.id
            const following = await this.followsRepository.find({
                where: {
                    userId,
                },
                relations: ["following", "user"]
            })

            const data = following.map((follow) => {
                return {
                    id: follow.id,
                    userId: follow.userId,
                    user: follow.following

                
                }
            })
            return res.status(200).json({
                message: "success",
                data,
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const follows = await this.followsRepository.delete({
                id,
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