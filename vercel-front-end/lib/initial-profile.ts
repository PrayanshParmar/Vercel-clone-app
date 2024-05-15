import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { db } from "./db";

const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  //   const { getToken } = auth();

  //   const profile = await fetch("http://localhost:9000/api/v1/user", {
  //     method: "POST",
  //   headers: { Authorization: `Bearer ${await getToken()}` },

  // }).then(res => res.json());

  const profile = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.user.create({
    data: {
      username: String(user.username),
      userId: user.id,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};

export default initialProfile;
