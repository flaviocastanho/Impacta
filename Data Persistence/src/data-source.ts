import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Author } from "./entity/Author";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Author, Comment, Post],
  migrations: [],
  subscribers: [],
});
