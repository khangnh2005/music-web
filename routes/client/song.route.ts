import {  Router } from "express";
import * as Controller from "../../controllers/client/song.controller"
const router: Router = Router();

router.get("/:slugTopic", Controller.index);
router.get("/detail/:slugSong", Controller.detail);


export const songRoutes: Router = router; 