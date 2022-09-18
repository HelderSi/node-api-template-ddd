import { Foo } from "../entities/Foo";
import {
  IFooCreateInputDTO,
} from "modules/foos/dtos/IFooCreateInputDTO";
import {
  IFoosRepository
} from "modules/foos/repositories/IFoosRepository";
import { IFooCreateOutputDTO } from "modules/foos/dtos/IFooCreateOutputDTO";

class FoosRepository implements IFoosRepository {
  private foos: Foo[] = [];

  async create({ name }: IFooCreateInputDTO): Promise<IFooCreateOutputDTO> {
    const foo = new Foo(name);

    this.foos.push(foo);

    return foo
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