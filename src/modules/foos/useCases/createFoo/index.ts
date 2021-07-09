
import { FoosRepository } from "../../repositories/implementations/FoosRepository";
import { CreateFooController } from "./CreateFooController";
import { CreateFooUseCase } from "./CreateFooUseCase";

const foosRepository = FoosRepository.getInstance();

const createFooUseCase = new CreateFooUseCase(foosRepository);

const createFooController = new CreateFooController(
    createFooUseCase
);

console.log(createFooController)

export { createFooController };