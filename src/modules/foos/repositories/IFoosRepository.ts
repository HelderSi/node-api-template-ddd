import { IFoo } from "../models/IFoo";
import {
  ICreateFooDTO,
} from "../dtos/IFooDTO";
/**
 * SOLID - LSP (Liskov Substitution Principle)
 */

interface IFoosRepository {
  findByName(name: string): IFoo | undefined;
  list(): IFoo[];
  create({ name }: ICreateFooDTO): void;
}

export { ICreateFooDTO, IFoosRepository };