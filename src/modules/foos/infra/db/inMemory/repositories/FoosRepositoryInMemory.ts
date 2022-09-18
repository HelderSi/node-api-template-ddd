import {
  IFooCreateInputDTO,
} from "modules/foos/dtos/IFooCreateInputDTO";
import { IFooCreateOutputDTO } from "modules/foos/dtos/IFooCreateOutputDTO";
import { IFoo } from "modules/foos/models/IFoo";
import {
  IFoosRepository
} from "modules/foos/repositories/IFoosRepository";

class FoosRepositoryInMemory implements IFoosRepository {
  private foos: IFoo[];

  private static INSTANCE: FoosRepositoryInMemory;

  constructor() {
    this.foos = [];
  }

  /**
   * Singleton Pattern
   */
  public static getInstance(): FoosRepositoryInMemory {
    if (!FoosRepositoryInMemory.INSTANCE) {
      FoosRepositoryInMemory.INSTANCE = new FoosRepositoryInMemory();
    }

    return FoosRepositoryInMemory.INSTANCE;
  }

  async create({ name }: IFooCreateInputDTO): Promise<IFooCreateOutputDTO> {
    const foo: IFoo = {
      id: Date.now().toString(),
      name,
      created_at: new Date(),
    };
    this.foos.push(foo);
    return foo
  }

  async list(): Promise<IFoo[]> {
    return this.foos;
  }

  async findByName(name: string): Promise<IFoo | undefined> {
    const foo = this.foos.find((foo) => foo.name === name);

    return foo;
  }
}

export { FoosRepositoryInMemory };