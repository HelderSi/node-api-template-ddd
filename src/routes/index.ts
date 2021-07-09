import { Router } from "express";

import { foosRoutes } from "./foos.routes";

const router = Router();

router.use("/foos", foosRoutes);

export { router };