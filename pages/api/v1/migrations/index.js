import migrationRunner from "node-pg-migrate"; // migrationRunner verifica quais migraçoes foram aplicadas e executadas as pendentes
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method} not allowed`, //method not allowed
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true, // roda as migrações sem aplicalas
      dir: join("infra", "migrations"), //diretorio de onde está as migrations
      direction: "up",
      verbose: true, // informar oque está fazendo
      migrationsTable: "pgmigrations", // em qual tabela
    };
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions); // retorno dela é a lista das migrações executadas

      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      //executar ou inserir
      const migratedMigration = await migrationRunner({
        ...defaultMigrationsOptions, // spread operatior ... "espalha o que tem dentro do objeto"
        dryRun: false, // roda as migrações já aplicando
      });

      if (migratedMigration.length > 0) {
        return response.status(201).json(migratedMigration); //201 deu certo e criei algo
      }

      return response.status(200).json(migratedMigration); // deu certo, mas lista vazia
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
