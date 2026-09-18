import {  Router } from "express";
import * as Controller from "../../controllers/client/song.controller"
const router: Router = Router();

router.get("/:slugTopic", Controller.index);
router.get("/detail/:slugSong", Controller.detail);
router.patch("/like/:typeLike/:idSong", Controller.like);
router.patch("/favorite/:typeFavorite/:idSong", Controller.favorite);


export const songRoutes: Router = router; 