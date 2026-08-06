import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import * as database from "./config/database"
import Topic from "./models/topic.model";
import clientRoutes from "./routes/client/index.route";


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

//route
clientRoutes(app)
//route End

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});