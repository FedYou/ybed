import "colors";
import fs from "fs-extra";
import yfile from "youfile";
import YCache from "youcache";
import path from "path";
import genConfig from "./config.js";
import genLang from "./lang.js";
import genResource from "./resource.js";
import genBehavior from "./behavior.js";

export default (answers) => {
  if (!fs.pathExistsSync(answers.name.trim())) {
    let projectPath = path.join(process.cwd(), answers.name.trim());
    let cacheProject = new YCache(answers.name.trim());

    const configPath = "bedcli.config.json";
    const configData = genConfig(answers);

    cacheProject.write.json(configPath, configData, 2);

    if (
      answers.type == "ad" ||
      answers.type == "adscr" ||
      answers.type == "rp"
    ) {
      genResource(cacheProject, configData);
    }
    if (
      answers.type == "ad" ||
      answers.type == "adscr" ||
      answers.type == "bp" ||
      answers.type == "scr"
    ) {
      genBehavior(cacheProject, configData);
    }

    genLang(cacheProject.path, configData.project);

    yfile.copy(cacheProject.path, projectPath);

    console.log("~Project successfully created".yellow.bold);
    console.log(`~\t cd ${configData.project.name}/`.white.dim);
    console.log(`~\t npm install`.white.dim);
    console.log(`~\t pnpm install`.white.dim);
  } else {
    console.log("~A folder with the same name already exists".red.bold);
  }
};
