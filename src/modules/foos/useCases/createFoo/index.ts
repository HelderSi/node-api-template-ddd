
import { FoosRepository } from "../../repositories/inMemory/FoosRepository";
import { CreateFooController } from "./CreateFooController";
import { CreateFooUseCase } from "./CreateFooUseCase";

export default function(): CreateFooController {
    const foosRepository = FoosRepository.getInstance();

    const createFooUseCase = new CreateFooUseCase(foosRepository);
    
    const createFooController = new CreateFooController(
        createFooUseCase
    );
    
    return createFooController;
}