import cors from "cors";
import express, { Application } from "express";
import passport from "passport";
import authRouter from "../routers/auth.router";
import "./passport";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";

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
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
      })
    );

    this.app.use(passport.initialize());
  };

  private registerRoutes = () => {
    this.app.use(Sentry.Handlers.requestHandler());

    this.app.use("/auth", authRouter);

    this.app.use(Sentry.Handlers.errorHandler());
  };
}

export default new App().app;
