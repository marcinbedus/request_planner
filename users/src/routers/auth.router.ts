import express from "express";
import passport from "passport";
import { authenticate } from "../middlewares/auth";
import AuthController from "../controllers/AuthController";

const router = express.Router();

router
  .get(
    "/github",
    passport.authenticate("github", {
      scope: ["profile"],
      session: false,
    })
  )
  .get(
    "/callback/github",
    passport.authenticate("github", {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login/error`,
    }),
    AuthController.redirectAfterLoginSuccess
  )
  .get("/refresh", AuthController.sendRefreshToken)
  .get("/logout", AuthController.logoutUser)
  .get("/user", authenticate, (req, res) => {
    res.send(req.user);
  });

export default router;
