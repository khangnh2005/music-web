import {  Router } from "express";
import * as Controller from "../../controllers/client/song.controller"
const router: Router = Router();

router.get("/:slugTopic", Controller.index);

export const songRoutes: Router = router; 