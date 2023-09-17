import { handle, visitor } from "@/libs/endpoint";
import jwt from "@/libs/jwt";
import prisma from "@/libs/prisma";
import Result from "@/libs/Result";
import argon2 from "argon2";
import { z } from "zod";

export default handle({
  post: visitor(
    async ({ email, password }) => {
      const user = await prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return Result.err({
          code: 401,
          message: "That email is not associated with a user.",
        });
      }

      const matches = await argon2.verify(user.password, password);

      if (!matches) {
        return Result.err({
          code: 401,
          message: "Invalid password.",
        });
      }

      return Result.ok({
        token: jwt.create({
          id: user.id,
          email: user.email,
        }),
      });
    },
    z.object({
      email: z.string(),
      password: z.string(),
    })
  ),
});
