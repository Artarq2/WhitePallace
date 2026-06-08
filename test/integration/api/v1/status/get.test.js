test("GET to api/v1/status should return 200", async () => {
  // Faz uma requisição para a rota e guarda a resposta
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200); // Verifica se o servidor respondeu com status 200 (tudo certo)

  const responseBody = await response.json(); // Converte o conteúdo da resposta de JSON para objeto JavaScript
  expect(responseBody.update_at).toBeDefined(); // Verifica se o campo update_at existe na resposta

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString(); // Pega o update_at recebido e converte para o formato de data padrão ISO
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  expect(responseBody.dependencies.database.database_version).toBeDefined(); // Verifica se o campo database_version existe na resposta
  const parsedDatabaseVersion =
    responseBody.dependencies.database.database_version; // Pega o database_version recebido
  expect(typeof parsedDatabaseVersion).toBe("string"); // Verifica se o database_version é uma string
  expect(parsedDatabaseVersion.length).toBeGreaterThan(0); // Verifica se o database_version não é uma string vazia
  console.log("Database version:", parsedDatabaseVersion); // Imprime a versão do banco de dados no console para verificar o valor retornado

  expect(responseBody.dependencies.database.max_connections).toBeDefined(); // Verifica se o campo max_connections existe na resposta
  const parsedMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(typeof parsedMaxConnections).toBe("number"); // Verifica se o max_connections é um número
  expect(parsedMaxConnections).toBeGreaterThan(0); // Verifica se o max_connections é um número positivo
  console.log("Max connections:", parsedMaxConnections); // Imprime o max_connections no console para verificar o valor retornado

  expect(responseBody.dependencies.database.conexaoativa).toBeDefined();
  const parsedConexaoAtiva = responseBody.dependencies.database.conexaoativa;
  expect(typeof parsedConexaoAtiva).toBe("number");
  expect(parsedConexaoAtiva).toEqual(1);
  console.log("Conexão ativa:", parsedConexaoAtiva);
});

/*
test("GET to api/v1/status should return 200", async () => {
  // Faz uma requisição para a rota e guarda a resposta
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200); // Verifica se o servidor respondeu com status 200 (tudo certo)

  const responseBody = await response.json(); // Converte o conteúdo da resposta de JSON para objeto JavaScript
  expect(responseBody.update_at).toBeDefined(); // Verifica se o campo update_at existe na resposta

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString(); // Pega o update_at recebido e converte para o formato de data padrão ISO
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  expect(responseBody.database_version).toBeDefined(); // Verifica se o campo database_version existe na resposta
  const parsedDatabaseVersion = responseBody.database_version; // Pega o database_version recebido
  expect(typeof parsedDatabaseVersion).toBe("string"); // Verifica se o database_version é uma string
  expect(parsedDatabaseVersion.length).toBeGreaterThan(0); // Verifica se o database_version não é uma string vazia
  console.log("Database version:", parsedDatabaseVersion); // Imprime a versão do banco de dados no console para verificar o valor retornado

  expect(responseBody.max_connections).toBeDefined(); // Verifica se o campo max_connections existe na resposta
  const parsedMaxConnections = responseBody.max_connections;
  expect(typeof parsedMaxConnections).toBe("number"); // Verifica se o max_connections é um número
  expect(parsedMaxConnections).toBeGreaterThan(0); // Verifica se o max_connections é um número positivo
  console.log("Max connections:", parsedMaxConnections); // Imprime o max_connections no console para verificar o valor retornado

  expect(responseBody.conexaoativa).toBeDefined(); 
  const parsedConexaoAtiva = responseBody.conexaoativa;
  expect(typeof parsedConexaoAtiva).toBe("number"); 
  expect(parsedConexaoAtiva).toBeGreaterThanOrEqual(0); 
  console.log("Conexão ativa:", parsedConexaoAtiva); 
*/
