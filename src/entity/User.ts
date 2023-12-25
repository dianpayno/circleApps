import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import {Thread} from "./Thread";
import { Replies } from "./Replies";
import {Follows} from "./Follows";
import {Likes} from "./Likes";

@Entity ({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    full_name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({nullable: true})
    profile_picture:string

    @Column({nullable: true})
    profile_description:string
    
    @OneToMany (() => Thread, (thread) => thread.user, {onDelete: "CASCADE"})
    threads:Thread[]

    @OneToMany (()=> Replies, (replies) => replies.user,{onDelete: "CASCADE"})
    replies: Replies[]

    @OneToMany(()=> Follows, (follows) => follows.user, {onDelete: "CASCADE"})
    follows:User[]

    @OneToMany(()=> Follows, (follows) => follows.following, {onDelete: "CASCADE"})
    following:User[]

    @OneToMany(()=>Likes, (likes) => likes.user, {onDelete: "CASCADE"})
    likes: Likes[]
}
