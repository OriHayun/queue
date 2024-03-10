import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response, Application, NextFunction } from "express";
import { json } from "body-parser";
import bodyParser from "body-parser";
import KeepAliveRoutes from "./routes/keepAlive.router";
import QueuesRoutes from "./routes/queue.router";
import { getDb } from "./utils/db";
import { APP_PORT } from "./configs/config";
import morgan from "morgan";

const app: Application = express();
app.use(morgan("dev"));

app.use(json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(QueuesRoutes);

app.listen(APP_PORT, () => {
  console.info(`A node js project is listening on port: ${APP_PORT} on env: ${app.get("env")}`);
});

export default app;
