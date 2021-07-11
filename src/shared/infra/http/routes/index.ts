import { Router } from "express";

import { foosRoutes } from "modules/foos/infra/http/routes";

const router = Router();

router.use("/api/foos", foosRoutes);

export { router };