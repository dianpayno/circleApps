import {Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "replies" })
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
  
  @Column({nullable: true})
  image: string;
  
  @Column()
  userId: number;

  @Column()
  threadId: number;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  posted_at: Date;

  @ManyToOne(() => User, (user) => user.replies,
  {
onDelete: "CASCADE"
  } )
  user: User;

  @ManyToOne(()=> Thread, (thread) => thread.replies,{
    onDelete: "CASCADE"
  })
  thread: Thread;
}
