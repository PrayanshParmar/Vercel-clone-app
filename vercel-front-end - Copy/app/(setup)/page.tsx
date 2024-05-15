import initialProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import NavBar from "@/components/navbar";
import HeroSection from "@/components/hero-section";

export default async function Home() {
  const profile = await initialProfile();

  if (!profile) {
    return (
      <>
        <NavBar />
        <div className=" w-full h-full flex flex-col items-center justify-center relative overflow-hidden z-[2] gap-4 ">
          <div className=" w-full h-full">
            <HeroSection />
          </div>
        </div>
      </>
    );
  }

  return redirect(`/dashboard/${profile.username}-projects`);
}
