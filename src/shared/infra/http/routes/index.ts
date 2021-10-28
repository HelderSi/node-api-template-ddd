import { Router } from "express";

import ensureAllowedByCors from "../middlewares/ensureAllowedByCors";
import { foosRoutes } from "modules/foos/infra/http/routes/foos.routes";

const router = Router();

router.use(ensureAllowedByCors)

router.use("/foos", foosRoutes);

export { router };