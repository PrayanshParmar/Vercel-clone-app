import React from "react";

import ThemedImage from "./themed-image";
import { currentProfile } from "@/lib/current-profile";
import { ModeToggle } from "./mode-toogle";

import { Menu, Slash } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { SearchTeams } from "./navbar-component/search-teams";
import { UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface NavBarProps {
  projectName?: string;
}

const NavBar = async ({ projectName }: NavBarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return (
      <>
        <nav className=" bg-white dark:bg-[#0A0A0A] h-[75px] w-full px-4 sm:px-6 flex  items-center">
          <div className=" flex flex-1 mr-auto">
            <ThemedImage folder="logo" width={105} height={34} />
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
            <Button variant="outline" className=" h-[32px] text-[13.8px] px-2">
              Sign in
            </Button>
            <Button variant="default" className=" h-[32px] text-[13.8px] px-2">
              Sign up
            </Button>
          </div>
          <div className="h-fit flex md:hidden items-center">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your from our servers.
                  </SheetDescription>
                  <DropdownMenu>
                    <DropdownMenuContent>
                      <DropdownMenuItem>HEllo</DropdownMenuItem>
                      <DropdownMenuItem>HEllo</DropdownMenuItem>
                      <DropdownMenuItem>HEllo</DropdownMenuItem>
                      <DropdownMenuItem>HEllo</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </>
    );
  }

  return (
    <nav className=" bg-white dark:bg-[#0A0A0A] h-[64px] w-full px-4 sm:px-6 flex  items-center">
      <div className=" flex flex-1 mr-auto">
        <ol className=" list-none max-w-full flex items-center">
          <li className=" hidden md:flex">
            <ThemedImage folder="icon" width={25} height={21.65} />
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
            <Avatar className=" w-[21px] h-[21px]">
              <AvatarImage src={profile.imageUrl} alt={profile.username} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="px-2">
              <span className=" font-semibold text-[13.8px] capitalize">{`${profile.username}'s projects`}</span>
            </div>
            <div className=" hidden md:flex">
              <Badge variant="secondary" className=" text-[11px]">
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
        <Button variant="ghost" className=" h-[32px] text-[13.8px] px-2">
          Feedback
        </Button>
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
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your from our servers.
              </SheetDescription>
              <DropdownMenu>
                <DropdownMenuContent>
                  <DropdownMenuItem>HEllo</DropdownMenuItem>
                  <DropdownMenuItem>HEllo</DropdownMenuItem>
                  <DropdownMenuItem>HEllo</DropdownMenuItem>
                  <DropdownMenuItem>HEllo</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
