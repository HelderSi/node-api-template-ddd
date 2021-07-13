
import { FoosRepositoryInMemory } from "../../repositories/inMemory/FoosRepositoryInMemory";
import { CreateFooController } from "./CreateFooController";
import { CreateFooUseCase } from "./CreateFooUseCase";

export default function (): CreateFooController {
    const foosRepository = FoosRepositoryInMemory.getInstance();

    const createFooUseCase = new CreateFooUseCase(foosRepository);

    const createFooController = new CreateFooController(
        createFooUseCase
    );

    return createFooController;
}