import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
  const databaseName = process.env.POSTGRES_DB;
  const connectionsAtResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
    //  "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';",
  });
  const connectionsAt = connectionsAtResult.rows[0].count;

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        database_version: databaseVersion,
        max_connections: maxConnections,
        connections_at: connectionsAt,
      },
    },
  });
}

export default status;

/* Antes 
import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;
  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
  const conexaoativaResult = await database.query(
    "SELECT COUNT(*) FROM pg_stat_activity;",
  );
  const conexaoativa = parseInt(conexaoativaResult.rows[0].count);

  response.status(200).json({
    update_at: updateAt,
    database_version: databaseVersion,
    max_connections: maxConnections,
    conexaoativa: conexaoativa,
           
}

export default status;

*/
