import { IFoo } from "../models/IFoo";
import {
  ICreateFooDTO,
} from "../dtos/ICreateFooDTO";
/**
 * SOLID - LSP (Liskov Substitution Principle)
 */

interface IFoosRepository {
  findByName(name: string): Promise<IFoo | undefined>;
  list(): Promise<IFoo[]>;
  create({ name }: ICreateFooDTO): Promise<void>;
}

export { IFoosRepository };