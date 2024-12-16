import { Entity, Column,ManyToOne,PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"


@Entity()
export class Comment {

    
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    text: string

    @ManyToOne(() => User, user => user.comments)
    user: User

    @ManyToOne(() => Post, post => post.comments)
    post: Post

}
