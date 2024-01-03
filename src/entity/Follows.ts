import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: "follows" })
export class Follows {
    
@PrimaryGeneratedColumn()
id:number

@Column()
userId:number


@Column()
followingId:number

@ManyToOne(()=> User, (user) => user.follows,{onDelete: "CASCADE"})
user:User[]

@ManyToOne(()=> User, (user) => user.following, {onDelete: "CASCADE"})
following:User[]
}