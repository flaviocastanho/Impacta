import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {Author} from "./Author"
import {Comment} from "./Comment"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string
    
    @OneToMany(() => Author, author => author.user)
    authors: Author[]
    
    @OneToMany(() => Comment, comment => comment.text)
    comments: Comment[]
}
