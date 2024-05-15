import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import axios from "axios";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized Access", { status: 401 });
    }

    await axios
      .get(`https://api.github.com/users/${profile.username}/repos`)
      .then(function (response) {
        return NextResponse.json(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          return new NextResponse(error.response.data, { status: 500 });

        }
      });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
