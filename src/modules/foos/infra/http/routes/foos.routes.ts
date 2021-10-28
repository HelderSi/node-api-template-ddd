import { Router } from "express";

import createFooController from "../../../useCases/createFoo";
import validateCreateFoo from "../middlewares/validators/validateCreateFoo";


const foosRoutes = Router();

// https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
// foosRoutes.post("/", createFooController.handle); // this code will make "this" undefined inside handle method 
foosRoutes.post("/", validateCreateFoo, (request, response) => createFooController().handle(request, response));

export { foosRoutes };