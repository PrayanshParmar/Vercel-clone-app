"use client";
import React from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

interface SearchTeamsProps {
  profile: {
    userId: string;
    username: string;
    imageUrl: string;
  };
}
export function SearchTeams({ profile }: SearchTeamsProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className=" w-[28px] border-none"
        onClick={handleToggleDialog}
      >
        <ChevronsUpDown strokeWidth={1} className=" w-[20px]" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Find Team..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Teams">
            <a href={`/dashboard/${profile.username}-projects`}>
              <CommandItem className=" flex items-center gap-2 text-[13.8px] font-semibold cursor-pointer">
                <Avatar className=" w-[22px] h-[22px]">
                  <AvatarImage src={profile.imageUrl} alt={profile.username} />
                  <AvatarFallback>{profile.username}</AvatarFallback>
                </Avatar>
                <span className=" capitalize">{`${profile.username}'s projects`}</span>
                <div className=" ml-auto">
                  <Check />
                </div>
              </CommandItem>
            </a>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
