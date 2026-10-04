import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import Topic from "./models/topic.model";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";


const app: Express = express();
const port : number | string = process.env.PORT || 3000 ;

//Pug
app.set("views", "./views");
app.set("view engine", "pug");
//Pug End

//env
dotenv.config()
//env End

//database connect
database.connect()
//database connect END

//Nhung file tinh 
app.use(express.static("public"))
//Nhung file tinh End

//App local variable
app.locals.prefixAdmin = systemConfig.prefixAdmin
//App local variable end

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

//route
clientRoutes(app)
adminRoutes(app)
//route End

database.connect().then(() => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});