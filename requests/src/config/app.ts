import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import { errorHandler } from "../middlewares/errorHandler";
import requestRouter from "../routers/request";
import { NotFoundError } from "../utils/errors/NotFoundError";

import * as Sentry from "@sentry/node";
import "./sentry";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.registerRoutes();
  }

  private config = () => {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());

    this.app.use(
      cors({
        origin: [process.env.CLIENT_URL as string],
        methods: "GET,POST,PUT,DELETE, PATCH",
        credentials: true,
      })
    );
  };

  private registerRoutes = () => {
    this.app.use(Sentry.Handlers.requestHandler());

    this.app.use("/request", requestRouter);

    this.app.all("*", (req, res) => {
      throw new NotFoundError();
    });

    this.app.use(Sentry.Handlers.errorHandler());
    this.app.use(errorHandler);
  };
}

export default new App().app;
