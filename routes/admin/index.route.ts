import { Express } from "express";
import {dashboardRoutes} from "./dashboard.route"
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";
import { songRoutes } from "./song.route";
import { uploadRoutes } from "./upload.route";

const adminRoutes = (app:Express):void=>{
    app.use(`/${systemConfig.prefixAdmin}/dashboard`, dashboardRoutes)
    app.use(`/${systemConfig.prefixAdmin}/topics`, topicRoutes)
    app.use(`/${systemConfig.prefixAdmin}/songs`, songRoutes)
    app.use(`/${systemConfig.prefixAdmin}/upload`, uploadRoutes)
}

export default adminRoutes
