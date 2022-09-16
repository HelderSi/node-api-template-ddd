import { container } from "tsyringe"
import { Request, Response } from "express";
import { SuccessResponseModel } from "shared/infra/http/models/SuccessResponseModel";

import { CreateFooUseCase } from "./CreateFooUseCase";

class CreateFooController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createFooUseCase = container.resolve(CreateFooUseCase)
    await createFooUseCase.execute({ name })

    return response.status(201).send({
      success: true,
      message: 'Success',
      payload: null
    } as SuccessResponseModel<null>);
  }
}

export { CreateFooController };
