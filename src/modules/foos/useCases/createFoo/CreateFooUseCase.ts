import { AppError } from "shared/errors/AppError";
import { IFoosRepository } from "../../repositories/IFoosRepository";

interface IRequest {
  name: string;
}

class CreateFooUseCase {
  /**
   * SOLID - DIP (Dependency Inversion Principle)
   * The "service" doesn't need to know what kind of storage we're using. Therefore,
   * we declare the database access object in the constructor
   */
  constructor(private foosRepository: IFoosRepository) { }

  execute({ name }: IRequest): void {
    const fooAlreadyExists = this.foosRepository.findByName(name);

    /**
     *  SOLID - SRP (Single Responsibility Principle)
     * - You cannot return a "response" because this term is from "Express"
     * - It is not the responsibility of the "service module" to do this
     * - Uncouple my code's dependency from "Express"
     */
    if (fooAlreadyExists) {
      throw new AppError("Foo already exists!", 400);
    }

    this.foosRepository.create({ name });
  }
}

export { CreateFooUseCase };