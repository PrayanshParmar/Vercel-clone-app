import {
  SignOutButton,
  UserButton,
  currentUser,
  SignInButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toogle";
import initialProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";


export default async function Home() {


  const profile = await initialProfile();

  if (!profile) {
    return (
      <>
        <div>Home Page</div>
        <SignInButton></SignInButton>
      </>
    );
  }

 

   return redirect(`/dashboard/${profile.username}-projects`)
  
}
