import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ecsClient } from "@/lib/aws-ecs-connector";
import { RunTaskCommand } from "@aws-sdk/client-ecs";
import { clusterConfig } from "@/lib/cluster-config";
import { NextRequest, NextResponse } from "next/server";
import { frameworktodir, getFirstWord, rootDirFind } from "@/lib/buidl-config";

export async function POST(req: NextRequest) {
  try {
    const { projectId } = await req.json();
    console.log(projectId);
    const profile = await currentProfile();

    if (!projectId) {
      return new NextResponse("No ID found", { status: 404 });
    }

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const project = await db.project.findUnique({ where: { id: projectId } });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const deployment = await db.deployment.create({
      data: {
        projects: { connect: { id: projectId } },
        status: "QUEUED",
      },
    });

    const installer = getFirstWord(project.installCommand);

    const builder = getFirstWord(project.buildCommand);

    const rdir = rootDirFind(project.rootDirectory);

    const odir = frameworktodir(project.framework);

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
              { name: "SUBDOMAIN", value: project.subDomain },
              { name: "DEPLOYMENT_ID", value: deployment.id },
              { name: "INSTALLER", value: installer },
              { name: "BUILD", value: builder },
              { name: "OUTDIR", value: odir },
              { name: "ROOTDIR", value: rdir },
            ],
          },
        ],
      },
    });
    await ecsClient.send(command);

    return NextResponse.json(deployment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { data } = await req.json();
    console.log(data);
    const profile = await currentProfile();

    if (!data) {
      return new NextResponse("No data found", { status: 404 });
    }
    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const deployment = await db.deployment.update({
      where: {
        id: data.deployment_id,
      },
      data: {
        status: data.status,
      },
    });

    return NextResponse.json(deployment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
