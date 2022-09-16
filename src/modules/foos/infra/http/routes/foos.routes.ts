import { Router } from "express";

import { CreateFooController } from "../../../useCases/createFoo/CreateFooController";
import validateCreateFoo from "../middlewares/validators/validateCreateFoo";


const foosRoutes = Router();

// https://stackoverflow.com/questions/45643005/why-is-this-undefined-in-this-class-method
// foosRoutes.post("/", createFooController.handle); // this code will make "this" undefined inside handle method 
const createFooController = new CreateFooController()
foosRoutes.post("/", validateCreateFoo, createFooController.handle);

export { foosRoutes };