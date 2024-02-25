import { auth } from "@clerk/nextjs";

export const currentProfile = async () => {
  const { userId, getToken } = auth();

  if (!userId) {
    return null;
  }


  const profile = await fetch(`http://localhost:9000/api/v1/user/`, {
    method: "GET",
    headers: { Authorization: `Bearer ${await getToken()}` },
  }).then((res) => res.json());

  return profile;
};
