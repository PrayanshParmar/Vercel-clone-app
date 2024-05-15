import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { currentProfile } from "./current-profile";

export const userProjects = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return null;
  }

  const project = await db.project.findMany({
    where: {
      userId: profile?.id,
    },
  });

  if (project.length === 0) {
    return null;
  }

  return project;
};
