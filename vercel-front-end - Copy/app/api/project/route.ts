import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }
    const project = await db.project.findMany({
      where: {
        userId: profile?.id,
      },
    });
  
    return NextResponse.json(project);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      full_name,
      subDomain,
      branch,
      rootDirectory,
      gitURL,
      installCommand,
      buildCommand,
      environmentVariables,
    } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const Previous = await db.project.findMany({
      where: {
        userId: profile.id,
        gitUrl: String(gitURL),
      },
    });

    if (Previous.length !== 0) {
      return new NextResponse("App is already configured", { status: 400 });
    }

    const project = await db.project.create({
      data: {
        userId: profile.id,
        name: name,
        full_name: full_name,
        subDomain: subDomain,
        branch: branch,
        rootDirectory: rootDirectory,
        gitUrl: gitURL,
        installCommand: installCommand,
        buildCommand: buildCommand,
        environmentVariables: environmentVariables,
      },
    });

    return  NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
