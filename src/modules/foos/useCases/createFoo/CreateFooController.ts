import { container } from "tsyringe"
import { Request, Response } from "express";
import { SuccessResponseModel } from "shared/infra/http/models/SuccessResponseModel";

import { CreateFooUseCase } from "./CreateFooUseCase";
import { IFooCreateOutputDTO } from "modules/foos/dtos/IFooCreateOutputDTO";

class CreateFooController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createFooUseCase = container.resolve(CreateFooUseCase)
    const createdFoo = await createFooUseCase.execute({ name })

    return response.status(201).send({
      success: true,
      message: 'Success',
      payload: createdFoo
    } as SuccessResponseModel<IFooCreateOutputDTO>);
  }
}

export { CreateFooController };
