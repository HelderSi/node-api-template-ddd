#!/bin/node
import createFolder from "./utils/createFolder";
import writeFile from "./utils/writeFile";

export default {
  execute: (args: string[]) => {
    const moduleName = args[0]
    if (!moduleName) {
      console.log(`Module name not informed`);
      process.exit(1);
    }

    console.log(`Adding new module: ${moduleName}`);

    createFolder(`src/modules/${moduleName}`);
    createFolder(`src/modules/${moduleName}/useCases`);
    createFolder(`src/modules/${moduleName}/models`);
    createFolder(`src/modules/${moduleName}/infra`);
    createFolder(`src/modules/${moduleName}/infra/http`);
    createFolder(`src/modules/${moduleName}/infra/someorm`);


    createFolder(`src/modules/${moduleName}/infra/http/middlewares`);
    createFolder(`src/modules/${moduleName}/infra/http/middlewares/validators`);

    createFolder(`src/modules/${moduleName}/infra/http/routes`);
    writeFile(`src/modules/${moduleName}/infra/http/routes/index.ts`, `
import { Router } from "express";

const ${moduleName}Routes = Router();

${moduleName}Routes.get("/", (request, response) => response.status(200).send({}));

export { ${moduleName}Routes };
    `)
  }
}
