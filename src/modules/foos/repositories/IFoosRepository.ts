import { Foo } from "../models/Foo";

/**
 * SOLID - LSP (Liskov Substitution Principle)
 */

// DTO => Data transfer object
interface ICreateFooDTO {
  name: string;
}

interface IFoosRepository {
  findByName(name: string): Foo;
  list(): Foo[];
  create({ name }: ICreateFooDTO): void;
}

export { ICreateFooDTO, IFoosRepository };