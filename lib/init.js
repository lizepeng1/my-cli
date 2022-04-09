'use strict';

const path = require("path");
const fs = require("fs-extra");
const util = require("../util");
const shell = require('shelljs');
const execSync = require("child_process").execSync;
const download = require("download-git-repo"); // 下载git仓库
const inquirer = require('inquirer'); // 命令行交互工具，主要是提问问题（https://www.jianshu.com/p/db8294cfa2f7）


const questions = [
  {
    type: "confirm",
    message: "该文件已存在，是否删除：",
    name: "removeFile",
  }
];

const questions1 = [{
  type: "list",
  name: "node_modules",
  message: "是否安装依赖：",
  choices: ["npm", "yarn", "不安装"]
}];

// direct:https://github.com/lizepeng1/dgr-template.git#main
function downloadProject(path = ".") {
  return new Promise((resolve, reject) => {
    download(
      `github:lizepeng1/dgr-template#main`,
      path,
      { clone: true },
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      }
    );
  });
}

module.exports = async (projectName, opt) => {
  const targetDir = path.join(process.cwd(), projectName);
  const isHasFile = util.hasFile(projectName);
  if(isHasFile){
    const answers = await inquirer.prompt(questions);
    if(answers.removeFile){
      shell.rm('-rf', targetDir);
    }else{
      util.log("创建失败，该文件已存在！", "red");
      return;
    }
  }
  const answers1 = await inquirer.prompt(questions1);
  util.log("开始创建项目...");
  const isDown = await downloadProject(targetDir);
  if (isDown !== true) {
    util.log(isDown)
    return;
  }
  if(answers1.node_modules !== "不安装"){
    execSync(`${answers1.node_modules} install`, {
      cwd: targetDir,
      stdio: ["inherit", "inherit", "inherit"]
    });
  }
  util.log("")
  util.log("")
  util.log(`cd ${projectName}`, "black")
  if(answers1.node_modules === "不安装") {
    util.log("npm install", "black")
  }
  util.log("")
  util.log(`创建完成`)
}