import { Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { Likes } from "../entity/Likes";
import { Repository } from "typeorm";


export default new class LikesServices {
private readonly likesRepository: Repository<Likes> =
    AppDataSource.getRepository(Likes);

async create(req: Request, res: Response) {
    try {
        const {userId, threadId} = req.body;
        const newLikes = await this.likesRepository.create({
        userId,
        threadId
        })
        await this.likesRepository.save(newLikes)
        return res.status(200).json({
            mesage: "success",
            data: newLikes
        })
    }catch (error) {
        return res.status(500).json({ message: "error creating data", error });
    }
}
async delete(req: Request, res: Response) {
    try{
        const id = Number(req.params.id);
        const like = await this.likesRepository.findOne({
            where:{
                id
            }
        })
        if(!like){
            return res.status(404).json({message: "data not found"})
        }
        await this.likesRepository.delete({id})
        return res.status(200).json({
            message: "success",
            data: like
        })
    } catch (error){
        return res.status(500).json({ message: "error deleting data", error });
    }
}

async findAll(req: Request, res: Response) {
    try{
        const likes = await this.likesRepository.find({
            relations: ["user", "thread"]
        })
        if(likes.length === 0){
            return res.status(404).json({message: "data not found"})
        }else{
            return res.status(200).json({
                message:"sukses",
                data: likes
            })

        }
    } catch (error){
        return res.status(500).json({ message: "error getting data", error });
    }
}

async findOne(req: Request, res: Response) {
    try{
        const id = Number(req.params.id);
        const like = await this.likesRepository.findOne({
            where:{
                id
            },
            relations: ["user", "thread"]
        })
        if(!like){
            return res.status(404).json({message: "data not found"})
        }
        return res.status(200).json({
            message:"sukses",
            data: like
        })
    } catch (error){
        return res.status(500).json({ message: "error getting data by id", error });
    }
}

}