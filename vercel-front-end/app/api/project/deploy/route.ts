import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ecsClient} from "@/lib/aws-ecs-connector"
import { RunTaskCommand } from "@aws-sdk/client-ecs";
import { clusterConfig } from "@/lib/cluster-config";
import { NextRequest, NextResponse } from "next/server";

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

    // const command = new RunTaskCommand({
    //   cluster: clusterConfig.CLUSTER,
    //   taskDefinition: clusterConfig.TASK,
    //   launchType: "FARGATE",
    //   count: 1,
    //   networkConfiguration: {
    //     awsvpcConfiguration: {
    //       subnets: [
    //         String(process.env.SUBNET_1),
    //         String(process.env.SUBNET_2),
    //         String(process.env.SUBNET_3),
    //       ],
    //       securityGroups: [String(process.env.SECURITY_GROUPS)],
    //       assignPublicIp: "ENABLED",
    //     },
    //   },
    //   overrides: {
    //     containerOverrides: [
    //       {
    //         name: String(process.env.CONTAINER_OVERRIDES_NAME),
    //         environment: [
    //           { name: "GIT_REPOSITORY__URL", value: project.gitUrl },
    //           { name: "PROJECT_ID", value: projectId },
    //           { name: "DEPLOYMENT_ID", value: deployment.id },
    //         ],
    //       },
    //     ],
    //   },
    // });
    // await ecsClient.send(command);

    return  NextResponse.json(deployment);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
