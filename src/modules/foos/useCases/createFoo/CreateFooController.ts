import { Request, Response } from "express";

import { CreateFooUseCase } from "./CreateFooUseCase";

class CreateFooController {
  constructor(private createFooUseCase: CreateFooUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    this.createFooUseCase.execute({name})

    return response.status(201).send();
  }
}

export { CreateFooController };
