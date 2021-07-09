#!/bin/node
import * as fs from 'fs'

function writeFile(path, fileContent) {
  const fileAlreadyExists = fs.existsSync(path);
  if (fileAlreadyExists){
    console.log(
      `${path} already exists.`,
    );
    process.exit(1);
  }
  if (fileContent) {
    fs.writeFile(path, fileContent, err => {
      if (err) {
        console.log('Damn it! Something went wrong. =(');
        throw err;
      }
    });
  }
}

function createFolder(folderName) {
    const folderAlreadyExists = fs.existsSync(folderName);
    if (folderAlreadyExists) {
        console.log(`Module already exists`);
        process.exit(1);
      }
      fs.mkdirSync(folderName);
}

export default {
  execute: (args: string[]) => {
    const moduleName = args[0]
    if (!moduleName) {
      console.log(`Module name not informed`);
      process.exit(1);
    }
  
    console.log(`Adding new module: ${moduleName}...`);
  
    createFolder(`src/modules/${moduleName}`);
  }
}
