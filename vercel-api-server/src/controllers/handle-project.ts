import express from "express";
import { z } from "zod";
import ecsClient from "../config/aws.ecs.connector";
import { RunTaskCommand } from "@aws-sdk/client-ecs";
import clusterConfig from "../config/cluster.config";
import { generateSlug } from "random-word-slugs";
import prisma from "../db/prisma-client";

export const createProject = async (
  req: express.Request,
  res: express.Response
) => {
  const schema = z.object({
    name: z.string(),
    gitURL: z.string().url(),
  });

  const safeParseResult = schema.safeParse(req.body);

  if (safeParseResult.success === false) {
    return res.status(400).json({ message: `${safeParseResult.error}` });
  }

  const { name, gitURL } = safeParseResult.data;

  //   const project = await prisma.project.create({
  //     data: {
  //       name,
  //       gitUrl: gitURL,
  //       subDomain: generateSlug(),
  //     },
  //   });

  //   return res.json({ status: "success", data: { project } });
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
