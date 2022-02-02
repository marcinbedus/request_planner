import passport, { Profile } from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import prisma from "./db";

declare global {
  namespace Express {
    interface User {
      id: string;
      username: string;
    }
  }
}

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CALLBACK as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { username: profile.username },
        });

        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = await prisma.user.create({
          data: { username: profile.username, githubId: profile.id },
        });

        done(null, newUser);
      } catch (e: any) {
        done(null, null);
      }
    }
  )
);
