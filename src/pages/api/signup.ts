import Result from "@/libs/Result";
import { handle, visitor } from "@/libs/endpoint";
import jwt from "@/libs/jwt";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { z } from "zod";

const prisma = new PrismaClient();

export default handle({
  post: visitor(
    async ({ email, password, organizationName }) => {

      const hashedPassword = await argon2.hash(password);

      if (await prisma.users.findFirst({ where: { email } })) {
        return Result.err({
          code: 409,
          message: "This email is already in use.",
        });
      }

      const user = await prisma.users.create({
        data: {
          password: hashedPassword,
          email,
      }});

      return Result.ok({
        token: jwt.create({id: user.id, email: user.email}),
      });
    },
    z.object({
      email: z.string(),
      password: z.string(),
      organizationName: z.string().optional(),
    })
  ),
});