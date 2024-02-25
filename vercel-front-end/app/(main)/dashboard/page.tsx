import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async () => {

    const profile =  await currentProfile();

    if(!profile){
      return redirectToSignIn();
    }
  
    return redirect(`/dashboard/${profile.username}-projects`)
};

export default Page;