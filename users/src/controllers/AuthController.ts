import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class AuthController {
  redirectAfterLoginSuccess = (req: Request, res: Response) => {
    const payload = {
      id: req.user?.id,
      username: req.user?.username,
    };

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: 86400,
    });
    const refreshToken = jwt.sign(
      {},
      process.env.REFRESH_TOKEN_SECRET as string,
      {
        expiresIn: 525600,
      }
    );

    res.cookie("auth", accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
    });

    res.redirect("http://localhost:3000");
  };

  sendRefreshToken = (req: Request, res: Response) => {
    const refreshToken = req.cookies.refresh as string;

    if (!refreshToken) {
      return res.sendStatus(403);
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err, user: any) => {
        if (err) return res.status(403);

        const accessToken = jwt.sign(
          { id: user.id },
          process.env.TOKEN_SECRET as string,
          {
            expiresIn: 86400,
          }
        );

        const refreshToken = jwt.sign(
          {},
          process.env.REFRESH_TOKEN_SECRET as string,
          {
            expiresIn: 525600,
          }
        );

        res.cookie("auth", accessToken, { httpOnly: true });
        res.cookie("refresh", refreshToken, { httpOnly: true });

        return res.sendStatus(200);
      }
    );
  };

  logoutUser = (req: Request, res: Response) => {
    res.cookie("auth", "");
    res.cookie("refresh", "");

    return res.sendStatus(200);
  };
}

export default new AuthController();
