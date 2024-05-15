import express from "express";
import prisma from "../db/prisma-client";
import clerkClient from "@clerk/clerk-sdk-node";

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.auth;

    const user = await clerkClient.users.getUser(String(userId));

    const profile = await prisma.user.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (profile) {
      return res.status(200).json(profile);
    }

    const newProfile = await prisma.user.create({
      data: {
        userId: String(user?.id),
        username: String(user?.username),
        email: String(user?.emailAddresses[0].emailAddress),
        imageUrl: String(user?.imageUrl),
      },
    });

    console.log("data",newProfile);
    res.status(200).json(newProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
};


export const findUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { userId } = req.auth;

    const user = await clerkClient.users.getUser(String(userId));

    const profile = await prisma.user.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!profile) {
      return res.status(401).json({data: "unauthorized"});

    }
    console.log("data",profile);
    return res.status(200).json(profile);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
}