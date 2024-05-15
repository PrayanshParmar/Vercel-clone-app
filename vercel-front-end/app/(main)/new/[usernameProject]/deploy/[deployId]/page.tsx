import DeployedLogs from "@/components/project/deployed-logs";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

interface DeployPageprops {
  params: {
    deployId: string;
  };
}
const page = async ({ params }: DeployPageprops) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return (
    <div className=" w-full h-full p-8">
      <DeployedLogs deployId={params.deployId} />
    </div>
  );
};

export default page;
