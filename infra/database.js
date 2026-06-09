import { Client } from "pg"; //importanto um codigo exeterno para conectar com o banco de dados
// client é a classe que tem os metodos para conectar com o banco de dados, fazer consultas, etc.
// pg é a biblioteca que tem a classe client, e é a biblioteca mais utilizada para conectar com o banco de dados postgres.

async function query(queryObject) {
  // async é uma palavra reservada do javascript que indica que a função é assíncrona, ou seja, ela pode demorar para ser executada, e o javascript não vai esperar ela terminar para executar o próximo código.
  const client = new Client({
    host: process.env.POSTGRES_HOST, // o host do banco de dados, ou seja, o endereço onde o banco de dados está rodando. No caso, localhost significa que o banco de dados está rodando na mesma máquina onde o código está sendo executado.
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER, // o usuário do banco de dados, ou seja, o nome de usuário que tem acesso ao banco de dados. No caso, postgres é o usuário padrão do banco de dados postgres.
    database: process.env.POSTGRES_DB, // o nome do banco de dados, ou seja, o nome do banco de dados que você quer conectar. No caso, postgres é o nome do banco de dados padrão do postgres.
    password: process.env.POSTGRES_PASSWORD, // a senha do banco de dados, ou seja, a senha do usuário que tem acesso ao banco de dados. No caso, localpostgres é a senha que eu configurei para o usuário postgres no meu banco de dados.
    ssl: true,
  }); // a variavel client , recebe uma nova instancia da classe client, ou seja, ela é um objeto que tem os metodos para conectar com o banco de dados, fazer consultas, etc.
  console.log("Credencias do Postgres:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect(); // espera a conexão com o banco de dados ser estabelecida, ou seja, ela vai esperar o banco de dados responder que a conexão foi estabelecida, antes de continuar executando o próximo código.
    const result = await client.query(queryObject); // a variavel result, recebe o resultado da consulta feita ao banco de dados, ou seja, ela vai esperar o banco de dados responder com o resultado da consulta, antes de continuar executando o próximo código.
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query, // como esta entre chaves , é um objeto. Assim criamos uma propriedade chamada query, que recebe o valor da função query.
};
