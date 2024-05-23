import NavBar from "@/components/navbar";
import NewProject from "@/components/project/new-project";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const Page = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className="w-full h-full ">
    Congratulation
    </div>
  );
};

export default Page;
