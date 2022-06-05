#!/bin/node
import createFolder from "./utils/createFolder";
import writeFile from "./utils/writeFile";
import capitalize from "./utils/capitalize";
import toCamelCase from "./utils/toCamelCase";

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
        writeFile(`${filePath}/${useCaseName}UseCase.ts`,
            `import { AppError } from "shared/errors/AppError";

interface IRequest {
}

class ${useCaseName}UseCase {

    constructor() { }

    async execute({ }: IRequest): Promise<void> {
    
    }
}

export { ${useCaseName}UseCase };
    `)

        writeFile(`${filePath}/${useCaseName}UseCase.spec.ts`,
            `import { AppError } from "shared/errors/AppError";
import { ${useCaseName}UseCase } from "./${useCaseName}UseCase"

let ${useCaseNameCamelCase}UseCase: ${useCaseName}UseCase;

describe("${useCaseName}UseCase", () => {

    beforeEach(() => {
        ${useCaseNameCamelCase}UseCase = new ${useCaseName}UseCase()
    })

    it("Should ${useCaseNameCamelCase}", async () => {
        await ${useCaseNameCamelCase}UseCase.execute({
        })

        expect(true).toBe(false)
    })

    it("Should not ${useCaseNameCamelCase}", async () => {
        await expect(
            ${useCaseNameCamelCase}UseCase.execute({
            })
        ).rejects.toBeInstanceOf(AppError);
    })

})
    `)




        writeFile(`${filePath}/${useCaseName}Controller.ts`,
            `import { Request, Response } from "express";
import { SuccessResponseModel } from "shared/infra/http/models/SuccessResponseModel";
import { ${useCaseName}UseCase } from "./${useCaseName}UseCase";

class ${useCaseName}Controller {
    constructor(private ${useCaseNameCamelCase}UseCase: ${useCaseName}UseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {

        await this.${useCaseNameCamelCase}UseCase.execute({})

        return response.status(200).send({
            success: true,
            message: 'Success',
            payload: null
        } as SuccessResponseModel<null>);
    }
}

export { ${useCaseName}Controller };
        
    `)


        writeFile(`${filePath}/${useCaseName}Controller.spec.ts`,
            `import request from 'supertest'
import { app } from 'shared/infra/http/app'

const appRequest = request(app)

describe('${useCaseName} Controller', () => {

    it('should response with 200', async () => {
        const response = await appRequest.get('/')
        expect(response.status).toBe(200)
    })

    it('should response with 400', async () => {
        const response = await appRequest
            .get('/')
            .set({ "x-foo": 'foo' })

        expect(response.status).toBe(400)
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('Bad Request')
    })

    it('should create and respond with 201', async () => {
        const body = {
            "name": "foo",
        }

        const response = await appRequest.post('/')
            .set({ "x-foo": 'foo' })
            .send(body)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })
})
    `)

        writeFile(`${filePath}/index.ts`,
            `import { ${useCaseName}Controller } from "./${useCaseName}Controller";
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
