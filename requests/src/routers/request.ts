import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import core from "express-serve-static-core";

import RequestController from "../controllers/RequestController";
import { authenticate } from "../middlewares/auth";
import { validationError } from "../middlewares/validationError";
import { requestValidator } from "../middlewares/validators";

const router = express.Router();

const use =
  <T extends core.ParamsDictionary>(fn: RequestHandler<T>) =>
  (req: Request<T>, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router
  .get("/", authenticate, use(RequestController.getRequests))
  .get("/check", use(RequestController.checkRequestsToPerform))
  .get("/:id", authenticate, use(RequestController.getRequestById))
  .post(
    "/",
    authenticate,
    requestValidator,
    validationError,
    use(RequestController.addRequest)
  )
  .patch("/:id", authenticate, use(RequestController.updateRequest))
  .delete("/:id", authenticate, use(RequestController.removeRequest));

export default router;
