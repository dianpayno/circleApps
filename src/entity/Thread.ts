import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User"
import {Replies} from "./Replies"
import {Likes} from "./Likes"

@Entity ({name: "threads"})
export class Thread {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    content: string;

    @Column({nullable: true})
    image: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    posted_at: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.threads, {onDelete: "CASCADE"})
    user: User;

    @OneToMany(() => Replies, (replies) => replies.thread,{onDelete: "CASCADE"})
    replies: Replies[];
    

    @OneToMany(() => Likes, (likes) => likes.thread, {onDelete: "CASCADE"})
    likes: Likes[]
}