// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/login", async (req: Request, res: Response) => {
  const login = req.body.login;
  const password = req.body.password;

  if (login === process.env.LOGIN && password === process.env.PASSWORD) {
    res.status(200).type("text/plain");
    res.send({
      success: true,
    });
  } else {
    res.status(401).type("text/plain");
    res.send({
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
