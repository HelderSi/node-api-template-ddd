#!/bin/node
import * as fs from 'fs'

export default function createFolder(folderName) {
    const folderAlreadyExists = fs.existsSync(folderName);
    if (folderAlreadyExists) {
        console.log(`Module already exists`);
        process.exit(1);
    }
    fs.mkdirSync(folderName);
}