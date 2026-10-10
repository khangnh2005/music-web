import {  Router } from "express";
import * as Controller from "../../controllers/admin/song.controller"
import multer from "multer"
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middleware"

const router: Router = Router();
const upload = multer()

router.get("/", Controller.index);
router.get("/create", Controller.create);
router.post("/create",
    upload.fields([
        {name : "avatar", maxCount : 1}
        ,{name: "audio" , maxCount : 1}
    ]),
    uploadCloud.uploadFields
    , Controller.createPost
);

export const songRoutes: Router = router; 