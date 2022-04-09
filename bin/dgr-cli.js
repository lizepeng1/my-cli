#!/usr/bin/env node   
// 必须要这句话，指定运行环境为node

const program = require("commander");
const pkg = require("../package.json");
const project = require("../");

// commander中的options，与usage中的options对应
program
  .version(pkg.version)
  .usage("<command> [options]")  // <>表示必须的参数，[]表示可选
  .option("-v, -V, --version", "版本号")
  .helpOption('-h, --HELP', "帮助") 

// commander中的command
program
  .command("init <项目名>")
  .description("初始化项目")
  .option("-a", "1")
  .action(project.init);
  
// 不能丢弃 
program.parse(process.argv);
// if (program.args.length < 1) program.help();