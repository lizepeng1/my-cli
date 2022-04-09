const fs = require("fs-extra");
const chalk = require("chalk");


// 检测当前目录是否有该文件
const hasFile = (filePath) => {
  if(!filePath) return false;
  return fs.existsSync(filePath)
}
// 封装控制台log
const log = (msg, color="green") => {
  console.log(chalk[color](msg))
}

module.exports = {
  hasFile,
  log
}