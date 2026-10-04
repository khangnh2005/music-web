import { Express } from "express";
import {dashboardRoutes} from "./dashboard.route"
import { systemConfig } from "../../config/config";
import { topicRoutes } from "./topic.route";

const adminRoutes = (app:Express):void=>{
    app.use(`/${systemConfig.prefixAdmin}/dashboard`, dashboardRoutes)
    app.use(`/${systemConfig.prefixAdmin}/topics`, topicRoutes)
}

export default adminRoutes
