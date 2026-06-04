import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;  "); // a variavel result, recebe o resultado da consulta feita ao banco de dados, ou seja, ela vai esperar o banco de dados responder com o resultado da consulta, antes de continuar executando o próximo código.
  console.log(result.rows); // imprime o resultado da consulta feita ao banco de dados, ou seja, ela vai imprimir o resultado da consulta feita ao banco de dados, que é um objeto com as propriedades rows, rowCount, etc.
  response.status(200).json({ chave: "tudo conforme o esperado" });
}

export default status;
