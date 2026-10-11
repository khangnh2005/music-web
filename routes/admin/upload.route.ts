import {  Router } from "express";
import * as Controller from "../../controllers/admin/upload.controller"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"
import multer from "multer"

const router: Router = Router();
const upload = multer()

router.post("/", 
    upload.single("file"),
    uploadCloud.uploadSingle,
    Controller.index
);

export const uploadRoutes: Router = router; 