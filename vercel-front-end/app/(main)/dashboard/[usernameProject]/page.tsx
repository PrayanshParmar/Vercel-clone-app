import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";
import { userProjects } from "@/lib/user-projects";

interface usernameProjectProps {
  params: { usernameProject: string };
}

const Page = async ({ params }: usernameProjectProps) => {
  const profile = await currentProfile();
  
  

  if (!profile) {
    return redirectToSignIn();
  }

  const str = params.usernameProject;
  const username = str.split("-");

  if (profile.username !== username[0]) {
    return redirect("/");
  }

  
  return(
    <Dashboard User={profile}/>
  )
};

export default Page;

