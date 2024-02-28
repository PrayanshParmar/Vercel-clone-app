import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { ChevronDown, PlusCircle, UploadCloud } from "lucide-react";

import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SearchBar from "@/components/search-bar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <>
      <NavBar />
      <div className=" w-full h-full flex flex-col px-4 sm:px-6  gap-4 ">
        <div className=" w-full h-fit flex items-center justify-center py-3 ">
          <SearchBar />
        </div>

        <div className=" w-full h-fit flex flex-col  items-center justify-center gap-2">
          <div className=" w-fit h-fit p-4 border rounded-lg">
            <UploadCloud className=" w-8 h-8 opacity-65 " strokeWidth={1.2} />
          </div>
          <span className=" text-base sm:text-lg font-medium">
            Deploy your first project
          </span>
          <div className="bg-white dark:bg-[#000]  max-w-[500px] w-full  h-fit flex flex-col min-[400px]:flex-row items-center justify-between p-4 border rounded-lg ">
            <div className=" w-full h-full flex flex-row items-center justify-start gap-2 ">
              <div className="bg-[#FAFAFA]  dark:bg-[#0A0A0A] p-1 border rounded-lg  ">
                <PlusCircle className="opacity-65" strokeWidth={1.2} />
              </div>
              <div className=" flex flex-col justify-center gap-[2px]">
                <span className=" font-semibold text-[14px] ">
                  Import Project
                </span>
                <span className=" font-medium text-[13px] ">
                  Add a repo from your git provider
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Import</Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-[#0A0A0A]">
                <DialogHeader>
                  <DialogTitle className=" text-xl sm:text-2xl text-center">
                    Import Git Repository
                  </DialogTitle>
                </DialogHeader>
                <div className=" w-full h-full flex flex-col gap-3">
                  <div className=" w-full h-fit px-[2px] flex flex-row items-center justify-between border rounded-md ">
                    <div className=" flex items-center gap-2  pl-[2px]">
                      <Avatar className=" w-[20px] h-[20px] ">
                        <AvatarImage src={profile.imageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className=" capitalize">{profile.username}</span>
                    </div>
                    <div className="ml-auto">
                      <Button variant="ghost" className=" w-fit h-fit p-1 ">
                        <ChevronDown />
                      </Button>
                    </div>
                  </div>
                  <div className=" w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md ">
                    <div className=" flex items-center gap-2">
                      <Avatar className=" w-[20px] h-[20px]">
                        <AvatarImage src={profile.imageUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className=" capitalize">{profile.username}</span>
                    </div>
                    <div className="ml-auto">
                      <Button>
                        Import
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
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
