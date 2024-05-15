import express from "express";
import { z } from "zod";
import ecsClient from "../config/aws.ecs.connector";
import { RunTaskCommand } from "@aws-sdk/client-ecs";
import clusterConfig from "../config/cluster.config";
import { generateSlug } from "random-word-slugs";
import prisma from "../db/prisma-client";
import clerkClient from "@clerk/clerk-sdk-node";
import { PrismaClient } from "@prisma/client";

export const createProject = async (
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
      return res.status(401).json({ data: "unauthorized" });
    }

    const KeyPairSchema = z.object({
      key: z.string(),
      value: z.string(),
    });
    
    const KeyPairsSchema = z.array(KeyPairSchema);
    
    const schema = z.object({
      name: z.string(),
      gitURL: z.string().url(),
      subDomain: z.string().optional(),
      rootDirectory: z.string().optional(),
      installCommand: z
        .enum(["NPM_INSTALL", "YARN_INSTALL", "PNPM_INSTALL", "BUN_INSTALL"])
        .optional(),
      buildCommand: z
        .enum([
          "NPM_RUN_BUILD",
          "YARN_RUN_BUILD",
          "PNPM_RUN_BUILD",
          "BUN_RUN_BUILD",
        ])
        .optional(),
      environmentVariables: KeyPairsSchema.optional(),
    });

    const safeParseResult = schema.safeParse(req.body);

    if (safeParseResult.success === false) {
      return res.status(400).json({ message: `${safeParseResult.error}` });
    }

    const { name, gitURL, subDomain, rootDirectory, installCommand, buildCommand, environmentVariables } = safeParseResult.data;

    console.log(safeParseResult.data);
    const project = await prisma.project.create({
      data: {
        name,
        gitUrl: gitURL,
        subDomain: subDomain || generateSlug(),
        rootDirectory: rootDirectory || "./",
        buildcommand: buildCommand || "NPM_RUN_BUILD",
        installCommand: installCommand || "NPM_INSTALL",
        environmentVariables: environmentVariables || undefined,
        users: { connect: { id: profile.id } },
      },
    });

    console.log("data",project);
    return res.json({ status: "success", data: { project } });


  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
};

export const getProject = async (
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
      return res.status(401).json({ data: "unauthorized" });
    }

    const project = await prisma.project.findMany({
      where: {
        userId: profile.id,
      },
    });

    if (project.length === 0) {
      return res.status(404).json({ data: "not found" });
    }

    console.log("data",project);
    res.status(200).json({ data: project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: "Internal server error" });
  }
};

export const deployProject = async (
  req: express.Request,
  res: express.Response
) => {
  const schema = z.object({
    projectId: z.string(),
  });

  const safeParseResult = schema.safeParse(req.body);

  if (safeParseResult.success === false) {
    return res.status(400).json({ message: `${safeParseResult.error}` });
  }

  const { projectId } = safeParseResult.data;

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project) return res.status(404).json({ error: "Project not found" });

  try {
    const deployment = await prisma.deployment.create({
      data: {
        projects: { connect: { id: projectId } },
        status: "QUEUED",
      },
    });

    const command = new RunTaskCommand({
      cluster: clusterConfig.CLUSTER,
      taskDefinition: clusterConfig.TASK,
      launchType: "FARGATE",
      count: 1,
      networkConfiguration: {
        awsvpcConfiguration: {
          subnets: [
            String(process.env.SUBNET_1),
            String(process.env.SUBNET_2),
            String(process.env.SUBNET_3),
          ],
          securityGroups: [String(process.env.SECURITY_GROUPS)],
          assignPublicIp: "ENABLED",
        },
      },
      overrides: {
        containerOverrides: [
          {
            name: String(process.env.CONTAINER_OVERRIDES_NAME),
            environment: [
              { name: "GIT_REPOSITORY__URL", value: project.gitUrl },
              { name: "PROJECT_ID", value: projectId },
              { name: "DEPLOYMENT_ID", value: deployment.id },
            ],
          },
        ],
      },
    });
    await ecsClient.send(command);

    return res.json({
      status: "queued",
      data: { deploymentId: deployment.id },
    });
  } catch (error) {
    res.status(500).json({ data: "Internal server error" });
  }
};
