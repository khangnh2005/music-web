import {  Router } from "express";
import * as Controller from "../../controllers/client/favorite-song.controller"
const router: Router = Router();

router.get("/", Controller.index);



export const favoriteSongRoutes: Router = router; 