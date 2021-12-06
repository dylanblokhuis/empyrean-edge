/**
 * how to run: node migrate.js $database $branch
 */
const concurrently = require('concurrently');

const args = process.argv.slice(2);

const database = args[0];
const branch = args[1];

async function main() {
  await concurrently([
    { command: `pscale branch create ${database} ${branch}` },
  ])

  await concurrently([
    { command: `pscale connect ${database} ${branch} --port 3309`, name: branch },
    { command: `pscale connect ${database} shadow --port 3310`, name: "shadow" }
  ])
}

main().then(() => console.log("Done"))