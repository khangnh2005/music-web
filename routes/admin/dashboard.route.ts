import {  Router } from "express";
import * as Controller from "../../controllers/admin/dashboard.controller"

const router: Router = Router();

router.get("/", Controller.index);

export const dashboardRoutes: Router = router; 