#!/bin/node
import * as fs from 'fs'

export default function writeFile(path, fileContent) {
    const fileAlreadyExists = fs.existsSync(path);
    if (fileAlreadyExists) {
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