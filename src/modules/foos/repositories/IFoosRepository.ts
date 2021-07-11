import { Foo } from "../entities/Foo";
import {
  ICreateFooDTO,
} from "../dtos/IFooDTO";
/**
 * SOLID - LSP (Liskov Substitution Principle)
 */

interface IFoosRepository {
  findByName(name: string): Foo | undefined;
  list(): Foo[];
  create({ name }: ICreateFooDTO): void;
}

export { ICreateFooDTO, IFoosRepository };