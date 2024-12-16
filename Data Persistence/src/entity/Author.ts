import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Post } from "./Post"
@Entity()
export class Author {

    
   @PrimaryGeneratedColumn()
    id: number
    @Column()
    tags: string

    @Column()
    surname: string
    @Column()
    completeName: string

    @ManyToOne(() => User, user => user.authors)
    user: User

    @OneToMany(() => Post, post => post.title)
    posts: Post[]
    

}
