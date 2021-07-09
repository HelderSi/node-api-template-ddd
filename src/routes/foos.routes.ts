import { Router } from "express";

import { createFooController } from "../modules/foos/useCases/createFoo";

const foosRoutes = Router();

// https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
// foosRoutes.post("/", createFooController.handle); // this code will make "this" undefined inside handle method 
foosRoutes.post("/", (request, response) => createFooController.handle(request, response));

export { foosRoutes };