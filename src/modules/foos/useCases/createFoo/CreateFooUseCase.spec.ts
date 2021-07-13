import { FoosRepositoryInMemory } from "modules/foos/repositories/inMemory/FoosRepositoryInMemory"
import { AppError } from "shared/errors/AppError";
import { CreateFooUseCase } from "./CreateFooUseCase"

let foosRepositoryInMemory: FoosRepositoryInMemory;
let createFooUseCase: CreateFooUseCase;

describe("Create Foo", () => {

    beforeEach(() => {
        foosRepositoryInMemory = new FoosRepositoryInMemory()
        createFooUseCase = new CreateFooUseCase(foosRepositoryInMemory)
    })

    it("Should create a new Foo", async () => {
        const name = 'test'
        await createFooUseCase.execute({
            name,
        })

        const fooCreated = await foosRepositoryInMemory.findByName(name)

        expect(fooCreated?.name).toBe(name)
        expect(fooCreated).toHaveProperty('id')
    })

    it("Should not create 2 Foos with same name", async () => {
        const name = 'test'
        await createFooUseCase.execute({
            name,
        })

        await expect(
            createFooUseCase.execute({
                name,
            })
        ).rejects.toEqual(new AppError("Foo already exists!"));
    })

})