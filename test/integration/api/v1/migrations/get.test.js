import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

test("GET to api/v1/migrations should return 200", async () => {
  // Faz uma requisição para a rota e guarda a resposta
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200); // Verifica se o servidor respondeu com status 200 (tudo certo)

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
  console.log(responseBody);
  console.log(process.env.POSTGRES_HOST);
});
