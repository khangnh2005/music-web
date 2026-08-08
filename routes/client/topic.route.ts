import {  Router } from "express";
import * as Controller from "../../controllers/client/topic.controller"
const router: Router = Router();

router.get("/", Controller.index);

export const topicRoutes: Router = router; 