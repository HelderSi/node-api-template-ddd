import { Request, Response } from "express";
import { SuccessResponseModel } from "shared/infra/http/models/SuccessResponseModel";

import { CreateFooUseCase } from "./CreateFooUseCase";

class CreateFooController {
  constructor(private createFooUseCase: CreateFooUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    this.createFooUseCase.execute({ name })

    return response.status(201).send({
      success: true,
      message: 'Success',
      payload: null
    } as SuccessResponseModel<null>);
  }
}

export { CreateFooController };
