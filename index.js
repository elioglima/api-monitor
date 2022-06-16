var execProcess = require("child_process").exec;
var config = require("./config");
console.log(config);

console.log("Iniciando execução do monitor");
console.log(`*************************************************`);
console.log(` `);

class Process {
  session = null;

  constructor(api) {
    var path = api.path ? `--cwd ${api.path}` : "";
    var params = api.params || "";
    var command = `yarn ${path} ${params}`;
    console.log(command);
    this.session = execProcess(command);

    this.session.stdout.on("data", function (data) {
      console.log(`*************************************************`);
      console.log(`${api.host}::${api.url}`);
      console.log(` `);
      console.log(data.toString());
      console.log(` `);
    });

    this.session.stderr.on("data", function (data) {
      console.log(`${api.host}:: [log]`);
      console.log(data.toString());
    });
  }

  GetProcess() {
    return this.session;
  }
}

let process = [];

if (config) {
  for (let i = 0; i < config.length; i++) {
    var program = config[i];
    process.push(new Process(program));
  }
}

console.log(process);
console.log(` `);
console.log(`*************************************************`);
console.log("Execução do monitor Finalizado");
