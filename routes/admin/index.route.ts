import { Express } from "express";
import {dashboardRoutes} from "./dashboard.route"
import { systemConfig } from "../../config/config";

const adminRoutes = (app:Express):void=>{
    app.use(`/${systemConfig.prefixAdmin}/dashboard`, dashboardRoutes)
}

export default adminRoutes
