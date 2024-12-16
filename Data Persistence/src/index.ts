import { AppDataSource } from "./data-source";
import {
  alterarUsuarioEmail,
  buscarUsuarioPeloNome,
  criarAuthor,
  criarUsuario,
  listarTodosAuthor,
  listarTodosComment,
  listarTodosPost,
  listarTodosUsuarios,
  removerUsuario,
  removerUsuarioPeloNome,
} from "../entity-mg";

import { User } from "./entity/User";
import { Author } from "./entity/Author";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserindo...");
    const user = new User();
    user.name = "Pedro";
    user.email = "Pedro@hotmail.com";

    /*INSERT USER*/
    await criarUsuario(user);

    /*LISTA TODOS USER*/
    const allUsers = await listarTodosUsuarios();

    /*DELETE USER*/
    await removerUsuarioPeloNome("Pedro");
    listarTodosUsuarios().then((u) =>
      u.forEach(async (u: User) => await removerUsuario(u))
    );

    /*INSERT USER*/
    console.log("Inserindo...");
    const user2 = new User();
    user2.name = "Felipe";
    user2.email = "Felipe@hotmail.com";

    await criarUsuario(user2);

    /*Busca User*/
    const SearchUser = await buscarUsuarioPeloNome("Felipe");
    console.log(SearchUser);

    console.log("Criando Author x User...");
    const autor = new Author();
    autor.tags = "tag";
    autor.surname = "Author";
    autor.completeName = "Nome Completo Author";
    autor.user = SearchUser;
    await criarAuthor(autor);

    /*UPDATE USER*/
    console.log("Update...");
    const user3 = new User();
    user3.name = "Felipe";
    user3.email = "Flavio@hotmail.com";

    /*UPDATE COM TRANSACTION */
    await alterarUsuarioEmail(user3);

    /*Lista Usuarios */
    const listUsers = await listarTodosUsuarios();
    console.log(listUsers);
    /*Lista Posts */
    const listPosts = await listarTodosPost();
    console.log(listPosts);
    /*Lista Comments */
    const listComments = await listarTodosComment();
    console.log(listComments);
    /*Lista Authors */
    const listAuthors = await listarTodosAuthor();
    console.log(listAuthors);
  })
  .catch((error) => console.log(error));
