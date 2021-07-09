import { Router } from "express";

import { createFooController } from "../modules/foos/useCases/createFoo";

const foosRoutes = Router();

foosRoutes.post("/", createFooController.handle );

export { foosRoutes };