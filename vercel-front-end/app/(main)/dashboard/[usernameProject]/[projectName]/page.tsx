import ProjectDetails from "@/components/project/details-project";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";


const Page = async () => {
  const profile = await currentProfile();
  
  
  if (!profile) {
    return redirectToSignIn();
  }
  return (
  
    <ProjectDetails User={profile} />
  );
};

export default Page;
