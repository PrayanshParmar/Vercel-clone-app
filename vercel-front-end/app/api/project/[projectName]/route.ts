import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import {  NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      projectName: string;
    };
  }
) {
  try {

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const project = await db.project.findFirst({
      where: {
        userId: profile.id,
        name: params.projectName,
      },
      select: {
        id: true,
        name: true,
        subDomain: true,
        branch: true,
        userId: true,
        gitUrl: true,
        Deployment: true,
      }
    });
    if (!project) {
      return  NextResponse.json({message:"Project Not Found"}, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
