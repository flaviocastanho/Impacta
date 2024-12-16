import { AppDataSource } from "./src/data-source";
import { Author } from "./src/entity/Author";
import { Comment } from "./src/entity/Comment";
import { Post } from "./src/entity/Post";
import { User } from "./src/entity/User";


export async function criarUsuario(user: User) {
    await AppDataSource.manager.save(user)
    console.log("Criando usuario: " + user.id)
}

export async function alterarUsuarioEmail(user: User) {
    const usr = await AppDataSource.manager.findOneBy(User, {
      name: user.name,
    });
    if (usr != null) {

        await AppDataSource.transaction(async (transactionalEntityManager) => {
            usr.email = user.email;
            await transactionalEntityManager.save(usr);
        });
    }
    console.log("Atualizando email usuario: " + user.name);
}

export async function buscarUsuarioPeloNome(name: string) {
    console.log(`Localizando o usuario [${name}]...`)
    const usr = await AppDataSource.manager.findOneBy(User, {
        name: name
    });
    if(usr != null && usr.id > 0) {
        return usr;
    }

    throw Error("Usuario não encontrado!");
}

export async function listarTodosUsuarios() {
    console.log("Lista todos os usuarios...")
    const users = await AppDataSource.manager.find(User, {
        relations: {
            authors: true
        },
        relationLoadStrategy: "query"
    })
    console.log("Carregando usuarios: ", users)
    return users;
}

export async function removerUsuario(user: User) {
    console.log("Deletando usuario da tabela ...")
    await AppDataSource.manager.delete(User, user.id);
    console.log("Usuario Deletado: ", user)
}

export async function removerUsuarioPeloNome(name: string) {
    console.log(`Deletando o usuario [${name}]...`)
    const usr = await buscarUsuarioPeloNome(name);
    await removerUsuario(usr);
}

export async function criarAuthor(author: Author) {
  await AppDataSource.manager.save(author);
  console.log("Criando Author: " + author.id);
}

export async function criarComment(comment: Comment) {
  await AppDataSource.manager.save(comment);
  console.log("Criando Comment: " + comment.id);
}

export async function criarPost(post: Post) {
  await AppDataSource.manager.save(post);
  console.log("Criando Post: " + post.id);
}

export async function listarTodosPost() {
  console.log("Lista todos os Posts...");
  const posts = await AppDataSource.manager.find(Post, {
    relations: {
    },
    relationLoadStrategy: "query",
  });
  console.log("Carregando Posts: ", posts);
  return posts;
}

export async function listarTodosComment() {
  console.log("Lista todos os Comment...");
  const comments = await AppDataSource.manager.find(Comment, {
    relations: {},
    relationLoadStrategy: "query",
  });
  console.log("Carregando Comments: ", comments);
  return comments;
}

export async function listarTodosAuthor() {
  console.log("Lista todos os Author...");
  const author = await AppDataSource.manager.find(Author, {
    relations: {},
    relationLoadStrategy: "query",
  });
  console.log("Carregando Author: ", author);
  return author;
}