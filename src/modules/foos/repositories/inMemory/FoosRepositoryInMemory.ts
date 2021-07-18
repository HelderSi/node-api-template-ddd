import { Foo } from "../../infra/someORM/entities/Foo";
import {
  ICreateFooDTO,
} from "../../dtos/ICreateFooDTO";
import {
  IFoosRepository
} from "../IFoosRepository";

class FoosRepositoryInMemory implements IFoosRepository {
  private foos: Foo[];

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

  async create({ name }: ICreateFooDTO): Promise<void> {
    const foo = new Foo();

    // taking an object and assigning data
    Object.assign(foo, {
      name,
      created_at: new Date(),
    });

    this.foos.push(foo);
  }

  async list(): Promise<Foo[]> {
    return this.foos;
  }

  async findByName(name: string): Promise<Foo | undefined> {
    const foo = this.foos.find((foo) => foo.name === name);

    return foo;
  }
}

export { FoosRepositoryInMemory };