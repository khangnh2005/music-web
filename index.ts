import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import * as database from "./config/database"


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

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/pages/topics/index")
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});