import React from "react";

import ThemedImage from "./themed-image";
import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "./mode-toogle";

import { Menu, Slash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchTeams } from "./navbar-component/search-teams";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import FeedbackPopover from "./navbar-component/feedback-popover";
import { imagePath } from "@/lib/image-path";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const NavBar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return (
      <>
        <nav className=" bg-white dark:bg-[#020617] h-[75px] w-full px-4 sm:px-6 flex  items-center">
          <div className=" flex flex-1 mr-auto">
            <ThemedImage src={{light: imagePath.icon.light, dark: imagePath.icon.dark}} width={34} height={34} />
          </div>
          <div className="h-fit hidden md:flex items-center gap-2 ">
            <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
              Help
            </Button>
            <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
              Docs
            </Button>
            <div className=" w-fit h-[32px]  ">
              <ModeToggle />
            </div>
            <Button
              variant="outline"
              className=" h-[32px] text-[13.8px] px-2"
              asChild
            >
              <SignInButton></SignInButton>
            </Button>
            <Button
              variant="default"
              className=" h-[32px] text-[13.8px] px-2"
              asChild
            >
              <SignUpButton></SignUpButton>
            </Button>
          </div>
          {/* side navbar */}
          <div className="h-fit flex md:hidden items-center">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className=" dark:bg-[#020617]  ">
                <SheetHeader>
                  <SheetTitle>Logo</SheetTitle>
                </SheetHeader>
                <div className="h-full w-full flex flex-col items-center  mt-2 gap-2  ">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-[#585b6eda] "
                  >
                    Help
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-[#585b6eda] "
                  >
                    Docs
                  </Button>

                  <Button
                    variant="outline"
                    className=" w-full bg-[#020617]"
                    asChild
                  >
                    <SignInButton></SignInButton>
                  </Button>
                  <Button variant="default" className=" w-full" asChild>
                    <SignUpButton></SignUpButton>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </>
    );
  }

  // Logeed in user navbar
  return (
    <nav className=" bg-white dark:bg-[#0A0A0A] h-[75px] w-full px-4 sm:px-6 flex  items-center border border-b ">
      <div className=" flex flex-1 mr-auto">
        <ol className=" list-none max-w-full flex items-center">
          <li className=" hidden md:flex">
            <ThemedImage src={{light: imagePath.icon.light, dark: imagePath.icon.dark}}  width={25} height={21.65} />
          </li>
          <li className="mx-[7px] hidden md:flex items-center ">
            <Slash
              strokeWidth={0.8}
              width={22}
              height={20}
              className=" text-gray-300 -rotate-12 "
            />
          </li>
          <li className=" flex items-center">
            <Avatar className=" w-[25px] h-[25px]">
              <AvatarImage src={profile.imageUrl} alt={profile.username} />
              <AvatarFallback><Skeleton/></AvatarFallback>
            </Avatar>
            <Link href={`/dashboard/${profile.username}-projects`} className="px-2">
              <span className=" font-semibold text-[15px] capitalize">{`${profile.username}'s projects`}</span>
            </Link >
            <div className=" hidden md:flex">
              <Badge variant="secondary" className=" text-[12px]">
                Hobby
              </Badge>
            </div>
            <div className=" ml-1">
              <SearchTeams profile={profile} />
            </div>
          </li>
        </ol>
      </div>
      <div className="h-fit hidden md:flex items-center ">
        <FeedbackPopover />
        <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
          Changelog
        </Button>
        <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
          Help
        </Button>
        <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
          Docs
        </Button>
        <div className=" w-fit h-[32px]  ">
          <ModeToggle />
        </div>
        <div className=" pl-2">
          <UserButton
            appearance={{
              elements: {
                avatarBox: " h-[30.4px] w-[30.4px]",
                card: " bg-white dark:bg-[#0A0A0A] text-[black] dark:text-[white] border  border-white",
                userPreviewSecondaryIdentifier:
                  " text-[black] dark:text-[white]",
                userButtonPopoverActionButtonIcon:
                  " text-black dark:text-white",
                userButtonPopoverActionButtonText:
                  " text-[black] dark:text-[white]",
              },
            }}
          />
        </div>
      </div>
      <div className="h-fit flex md:hidden items-center">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="h-full w-full flex flex-col items-center  mt-2 gap-2  ">
                <FeedbackPopover   />
                <Button variant="ghost" className="w-full">
                  Changelog
                </Button>
                <Button variant="ghost" className="w-full">
                  Help
                </Button>
                <Button variant="ghost" className="w-full">
                  Docs
                </Button>
                <div className=" w-fit ">
                  <ModeToggle />
                </div>
                <div>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: " h-[36.4px] w-[36.4px]",
                        card: " bg-white dark:bg-[#0A0A0A] text-[black] dark:text-[white] border  border-white",
                        userPreviewSecondaryIdentifier:
                          " text-[black] dark:text-[white]",
                        userButtonPopoverActionButtonIcon:
                          " text-black dark:text-white",
                        userButtonPopoverActionButtonText:
                          " text-[black] dark:text-[white]",
                      },
                    }}
                  />
                </div>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
