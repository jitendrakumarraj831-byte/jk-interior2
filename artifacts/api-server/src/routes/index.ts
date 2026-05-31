import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import chatRouter from "./chat.js";
import contactRouter from "./contact.js";
import leadsRouter from "./leads.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(contactRouter);
router.use(leadsRouter);

export default router;
