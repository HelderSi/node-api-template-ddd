import { IFoo } from "../models/IFoo";
import {
  IFooCreateInputDTO,
} from "../dtos/IFooCreateInputDTO";
import { IFooCreateOutputDTO } from "../dtos/IFooCreateOutputDTO";
/**
 * SOLID - LSP (Liskov Substitution Principle)
 */

interface IFoosRepository {
  findByName(name: string): Promise<IFoo | undefined>;
  list(): Promise<IFoo[]>;
  create({ name }: IFooCreateInputDTO): Promise<IFooCreateOutputDTO>;
}

export { IFoosRepository };