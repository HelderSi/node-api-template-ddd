import { Router } from "express";

import ensureAllowedByCors from "../middlewares/ensureAllowedByCors";
import { foosRoutes } from "modules/foos/infra/http/routes";

const router = Router();

router.use(ensureAllowedByCors)

router.use("/api/v1/foos", foosRoutes);

export { router };