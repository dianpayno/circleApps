import { Entity, PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "likes" })
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    threadId: number;

    @ManyToOne(() => Thread, (thread) => thread.likes, {onDelete: "CASCADE"})
    thread: Thread;

    @ManyToOne(() => User, (user) => user.likes, {onDelete: "CASCADE"})
    user: User;
}