import express from "express";
import { z } from "zod";
import prisma from "../db/prisma-client";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const schema = z.object({
    userId: z.string(),
    username: z.string(),
    email: z.string(),
    imageUrl: z.string().url(),
  });

  const safeParseResult = schema.safeParse(req.body);

  if (safeParseResult.success === false) {
    return res.status(400).json({ message: `${safeParseResult.error}` });
  }

  const { userId, email, username, imageUrl } = safeParseResult.data;

  try {
    const newProfile = await prisma.user.create({
      data: {
        userId,
        username,
        email,
        imageUrl,
      },
    });

    res.status(200).json({ data: newProfile });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }

  return res;
};
