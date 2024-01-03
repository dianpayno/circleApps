import amqp from "amqplib";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Thread } from "../entity/Thread";


export default new (class QuequeServices {
  async createThreads(req: Request, res: Response) {
    try {
      const payload = {
        content: req.body.content,
        image: req.body.image,
        userId: res.locals.payload.user.id,
      }
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();

      await channel.assertQueue("thread queue");
      channel.sendToQueue("thread queue", Buffer.from(JSON.stringify(payload)));
      
      await channel.consume("thread queue", (message) => {
        if(message) {
          const payload = JSON.parse(message.content.toString());
          const newThread = AppDataSource.getRepository(Thread).create(payload);
          AppDataSource.getRepository(Thread).save(newThread);
          channel.ack(message);
        }
    })
      await channel.close();
      await connection.close();

      res.status(200).json({ message: "success enqueue" });
    } catch (error) {
      console.log("inierror", error);
      res.status(500).json({ message: "error enqueue", error });
    }
  }
})();
