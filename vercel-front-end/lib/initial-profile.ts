import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const { getToken } = auth();

  const profile = await fetch("http://localhost:9000/api/v1/user", {
    method: "POST",
  headers: { Authorization: `Bearer ${await getToken()}` },

}).then(res => res.json());

 return profile;
};

export default initialProfile;
