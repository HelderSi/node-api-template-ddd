import { IFooCreateInputDTO } from "./IFooCreateInputDTO";

export interface IFooCreateOutputDTO extends IFooCreateInputDTO {
    id: string;
    created_at: Date;
}