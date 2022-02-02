import { Request, Response } from "express";
import QueueHandler from "../services/QueueHandler";
import RequestService from "../services/RequestService";
import { CronRequest } from "../typings/app.d";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { InternalServerError } from "../utils/errors/InternalServerError";
import { Request as DBRequest } from "@prisma/client";

class RequestController {
  public getRequests = async (
    req: Request<{}, {}, {}, Partial<DBRequest>>,
    res: Response
  ) => {
    if (!req.user) throw new BadRequestError();

    try {
      const requests = await RequestService.getRequests({
        userId: req.user.id,
        ...req.query,
      });

      res.json({ data: requests });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e);
    }
  };

  public getRequestById = async (
    req: Request<
      { id: string },
      {},
      {},
      { responseCount?: string; responseOrder?: "asc" | "desc" }
    >,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const request = await RequestService.getRequest(id, req.query);

      return res.json({ data: request });
    } catch (e: any) {
      console.log(e);
      throw new InternalServerError(e);
    }
  };

  public addRequest = async (
    req: Request<{}, {}, CronRequest>,
    res: Response
  ) => {
    if (!req.user) throw new BadRequestError();

    try {
      const request = await RequestService.addRequest(req.body, req.user.id);

      return res.send({
        message: "Request added",
        data: request,
      });
    } catch (e: any) {
      throw new InternalServerError(e);
    }
  };

  public removeRequest = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await RequestService.removeRequest(id);

      return res.send({
        message: "Request removed",
      });
    } catch (e: any) {
      throw new InternalServerError(e);
    }
  };

  public updateRequest = async (
    req: Request<{ id: string }, {}, CronRequest>,
    res: Response
  ) => {
    try {
      const { id } = req.params;

      const request = await RequestService.updateRequest(id, req.body);

      return res.send({
        message: "Request updated",
        data: request,
      });
    } catch (e: any) {
      throw new InternalServerError(e);
    }
  };

  public checkRequestsToPerform = async (req: Request, res: Response) => {
    try {
      const toPerform = await RequestService.getRequestsToPerform();
      if (toPerform.length) {
        QueueHandler.sendRequestsToQueue(toPerform);
      }

      return res.send({ message: "checking finished" });
    } catch (e: any) {
      throw new InternalServerError(e);
    }
  };
}

export default new RequestController();
