import {
  SignOutButton,
  UserButton,
  currentUser,
  SignInButton,
} from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toogle";
import initialProfile from "@/lib/initial-profile";

export default async function Home() {
  const user = await currentUser();

  const profile = await initialProfile();
  if (profile === null) {
    return (
      <>
        <div>Home Page</div>
        <SignInButton></SignInButton>
      </>
    );
  }

  return (
    <div className=" flex flex-col items-center justify-center gap-2">
      <p className=" text-xl font-bold text-blue-300">Hello there</p>
      <UserButton></UserButton>
      <SignOutButton />
      <ModeToggle />
    </div>
  );
}
