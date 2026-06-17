const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    // stdout exibir as saidas normais dos logs q estão acontencendo
    //stderr exibir as saidas de mensagens de error
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\nPostgres está pronto e aceitando conexões!\n");
  }
}

process.stdout.write("\n\nAguardando Postgres aceitar conexões");

checkPostgres();
