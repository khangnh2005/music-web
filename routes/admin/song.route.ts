import {  Router } from "express";
import * as Controller from "../../controllers/admin/song.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const router: Router = Router();
const upload = multer()

router.get("/", Controller.index);
router.get("/create", Controller.create);
router.post("/create",
    upload.single("avatar"),
    uploadCloud.uploadSingle
    , Controller.createPost
);

export const songRoutes: Router = router; 