#!/bin/node
import * as fs from 'fs'

export default function createFolder(folderName) {
    const folderAlreadyExists = fs.existsSync(folderName);
    if (folderAlreadyExists) {
        return
    }
    fs.mkdirSync(folderName);
}