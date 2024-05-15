import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { userProjects } from "@/lib/user-projects";
import NotFoundDashboard from "@/components/dashboard/not-found-dashboard";
import FoundDashboard from "@/components/dashboard/found-dashboard";
import Dashboard from "@/components/dashboard/dashboard";

interface usernameProjectProps {
  params: { usernameProject: string };
}

const Page = async ({ params }: usernameProjectProps) => {
  const profile = await currentProfile();
  const project = await userProjects();
  
  

  if (!profile) {
    return redirectToSignIn();
  }

  const str = params.usernameProject;
  const username = str.split("-");

  if (profile.username !== username[0]) {
    return redirect("/");
  }

  return(
    <Dashboard User={profile} />
  )
};

export default Page;

