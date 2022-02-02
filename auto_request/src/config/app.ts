import express from "express";
import "../services/QueueHandler";
import "./sentry";

class App {
  app = express();

  constructor() {}

  config = () => {
    this.app.use(express.json());
  };
}

export default new App().app;
