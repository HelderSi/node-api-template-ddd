import { Foo } from "../../models/Foo";
import {
  ICreateFooDTO,
  IFoosRepository
} from "../IFoosRepository";

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

  create({ name }: ICreateFooDTO): void {
    const foo = new Foo();

    // taking an object and assigning data
    Object.assign(foo, {
      name,
      created_at: new Date(),
    });

    this.foos.push(foo);
  }

  list(): Foo[] {
    return this.foos;
  }

  findByName(name: string): Foo {
    const foo = this.foos.find((foo) => foo.name === name);

    return foo;
  }
}

export { FoosRepository };