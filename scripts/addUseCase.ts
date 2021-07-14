#!/bin/node
import createFolder from "./createFolder";
import writeFile from "./writeFile";

function toCamelCase(name: string) {
    return name.charAt(0).toLocaleLowerCase() + name.slice(1);
}

function capitalize(name: string) {
    return name.charAt(0).toLocaleUpperCase() + name.slice(1);
}

export default {
    execute: (args: string[]) => {
        if (!args[0]) {
            console.log(`Please use "add usecase [moduleName]/[UseCaseName]" syntax.`);
            process.exit(1);
        }

        let [moduleName, useCaseName] = args[0].split('/')

        if (!moduleName) {
            console.log(`Module name not informed. Please use [moduleName]/[UseCaseName] syntax.`);
            process.exit(1);
        }
        if (!useCaseName) {
            console.log(`Use case name not informed. Please use [moduleName]/[UseCaseName] syntax.`);
            process.exit(1);
        }

        useCaseName = capitalize(useCaseName)
        const useCaseNameCamelCase = toCamelCase(useCaseName)

        console.log(`Adding new use case: ${useCaseName}`);

        const filePath = `src/modules/${moduleName}/useCases/${useCaseNameCamelCase}`
        createFolder(filePath);
        writeFile(`${filePath}/${useCaseName}UseCase.ts`, `
import { AppError } from "shared/errors/AppError";

interface IRequest {
}

class ${useCaseName}UseCase {

    constructor() { }

    execute({ }: IRequest): void {
    
    }
}

export { ${useCaseName}UseCase };
    `)

        writeFile(`${filePath}/${useCaseName}UseCase.spec.ts`, `
import { AppError } from "shared/errors/AppError";
import { ${useCaseName}UseCase } from "./${useCaseName}UseCase"

let ${useCaseNameCamelCase}UseCase: ${useCaseName}UseCase;

describe("${useCaseName}UseCase", () => {

    beforeEach(() => {
        ${useCaseNameCamelCase}UseCase = new ${useCaseName}UseCase()
    })

    it("Should ${useCaseNameCamelCase}", () => {
        ${useCaseNameCamelCase}UseCase.execute({
        })

        expect(true).toBe(false)
    })

})
    `)




        writeFile(`${filePath}/${useCaseName}Controller.ts`, `
import { Request, Response } from "express";

import { ${useCaseName}UseCase } from "./${useCaseName}UseCase";

class ${useCaseName}Controller {
    constructor(private ${useCaseNameCamelCase}UseCase: ${useCaseName}UseCase) { }

    handle(request: Request, response: Response): Response {

        this.${useCaseNameCamelCase}UseCase.execute({})

        return response.status(200).send();
    }
}

export { ${useCaseName}Controller };
        
    `)


        writeFile(`${filePath}/${useCaseName}Controller.spec.ts`, `
import request from 'supertest'
import { app } from 'shared/infra/http/app'

const appRequest = request(app)

describe('${useCaseName} Controller', () => {

    it('should response with 200', async () => {
        const response = await appRequest.post('/').send({})
        expect(response.status).toBe(200)
    })
})
    `)

        writeFile(`${filePath}/index.ts`, `
import { ${useCaseName}Controller } from "./${useCaseName}Controller";
import { ${useCaseName}UseCase } from "./${useCaseName}UseCase";

export default function (): ${useCaseName}Controller {

    const ${useCaseNameCamelCase}UseCase = new ${useCaseName}UseCase();

    const ${useCaseNameCamelCase}Controller = new ${useCaseName}Controller(
        ${useCaseNameCamelCase}UseCase
    );

    return ${useCaseNameCamelCase}Controller;
}
    `)


        console.log("Done! ;)")
    }
}
