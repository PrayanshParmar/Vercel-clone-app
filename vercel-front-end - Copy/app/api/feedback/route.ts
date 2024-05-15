import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { feedback } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    const Previous = await db.feedback.findUnique({
      where: {
        userId: profile.id,
      },
    });

    if (Previous) {
      await db.feedback.update({
        where: {
          userId: profile.id,
        },
        data: {
          feedback: feedback,
        },
      });
      return new NextResponse("Previous feedback is modified", { status: 200 });
    }

    await db.feedback.create({
      data: {
        userId: profile.id,
        feedback: feedback,
      },
    });

    return new NextResponse("Thank you for your feedback! Your message has been successfully sent", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
