import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";

const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
}

  const profile = await db.users.findUnique({
    where: {
      userId: user?.id,
    },
  });

  if (profile){
    return profile;
  }

  const newProfile = await db.users.create({
    data:{
        userId: String(user?.id),
        username: String(user?.username),
        email: String(user?.emailAddresses[0].emailAddress),
        imageUrl: String(user?.imageUrl)
    }
  })

  return newProfile;
};

export default initialProfile;
