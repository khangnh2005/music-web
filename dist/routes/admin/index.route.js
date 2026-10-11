"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_route_1 = require("./dashboard.route");
const config_1 = require("../../config/config");
const topic_route_1 = require("./topic.route");
const song_route_1 = require("./song.route");
const upload_route_1 = require("./upload.route");
const adminRoutes = (app) => {
    app.use(`/${config_1.systemConfig.prefixAdmin}/dashboard`, dashboard_route_1.dashboardRoutes);
    app.use(`/${config_1.systemConfig.prefixAdmin}/topics`, topic_route_1.topicRoutes);
    app.use(`/${config_1.systemConfig.prefixAdmin}/songs`, song_route_1.songRoutes);
    app.use(`/${config_1.systemConfig.prefixAdmin}/upload`, upload_route_1.uploadRoutes);
};
exports.default = adminRoutes;
