import { ModeToggle } from "@/components/mode-toogle";
import NavBar from "@/components/navbar";
import { currentProfile } from "@/lib/current-profile";
import {
  SignOutButton,
  UserButton,
  redirectToSignIn,
  auth,
} from "@clerk/nextjs";

import { redirect } from "next/navigation";

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
    return redirect('/');
  }

  return (
    <div className=" h-full w-full">
      <NavBar />
      <p>hello</p>
      <UserButton />
      <ModeToggle />
    </div>
  );
};

export default Page;

{
  /* <div>Dash</div>
      <UserButton />
      <SignOutButton />
      <ModeToggle/>
      <ThemedImage width={200} height={200} /> */
}
