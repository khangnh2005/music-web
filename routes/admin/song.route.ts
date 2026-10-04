import {  Router } from "express";
import * as Controller from "../../controllers/admin/song.controller"

const router: Router = Router();

router.get("/", Controller.index);
router.get("/create", Controller.create);

export const songRoutes: Router = router; 