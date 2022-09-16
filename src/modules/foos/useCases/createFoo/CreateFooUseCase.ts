import { inject, injectable } from 'tsyringe'
import { AppError } from "shared/errors/AppError";
import { IFoosRepository } from "../../repositories/IFoosRepository";

interface IRequest {
  name: string;
}

@injectable()
class CreateFooUseCase {
  /**
   * SOLID - DIP (Dependency Inversion Principle)
   * The "service" doesn't need to know what kind of storage we're using. Therefore,
   * we declare the database access object in the constructor
   */
  constructor(
    @inject("FoosRepository")
    private foosRepository: IFoosRepository
  ) { }

  async execute({ name }: IRequest): Promise<void> {
    const fooAlreadyExists = await this.foosRepository.findByName(name);

    /**
     *  SOLID - SRP (Single Responsibility Principle)
     * - You cannot return a "response" because this term is from "Express"
     * - It is not the responsibility of the "service module" to do this
     * - Uncouple my code's dependency from "Express"
     */
    if (fooAlreadyExists) {
      throw new AppError("Foo already exists!", 400);
    }

    await this.foosRepository.create({ name });
  }
}

export { CreateFooUseCase };