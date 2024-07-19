import { ExecException, exec } from "node:child_process";

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}

function handleReturn(error: ExecException, stdout: string, _stderr: string) {
  if (stdout.search("accepting connections") === -1) {
    process.stdout.write(".");
    checkPostgres();
    return;
  }
  console.log("\n🚀 Postgres decolou!\n");
}

console.log("\n🔴 Aguardando decolagem do Postgres");
checkPostgres();
