import { Foo } from "../entities/Foo";
import {
  ICreateFooDTO,
} from "modules/foos/dtos/ICreateFooDTO";
import {
  IFoosRepository
} from "modules/foos/repositories/IFoosRepository";

class FoosRepository implements IFoosRepository {
  private foos: Foo[];

  private static INSTANCE: FoosRepository;

  private constructor() {
    this.foos = [];
  }

  /**
   * Singleton Pattern
   */
  public static getInstance(): FoosRepository {
    if (!FoosRepository.INSTANCE) {
      FoosRepository.INSTANCE = new FoosRepository();
    }

    return FoosRepository.INSTANCE;
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

export { FoosRepository };