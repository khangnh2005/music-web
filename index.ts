import express, { Express, Request, Response } from "express";

const app: Express = express();
const port : any = 3000 ;

//Pug
app.set("views", "./views");
app.set("view engine", "pug");
//Pug End

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/pages/topics/index")
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});