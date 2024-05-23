"use client";
import {
  Command,
  CommandDialog,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useModel } from "@/hooks/use-model-store";
import { Project, User } from "@prisma/client";
import { useState } from "react";
import ProjectCard from "./dashboard/project-card";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

interface SearchBarProps {
  User: User;
  Project?: Project[];
}
const SearchBar = ({ User, Project }: SearchBarProps) => {
  const { onOpen } = useModel();
  const [open, setOpen] = useState(false);
  const router = useRouter();

const onclick = (name: string) => {

  return router.push(`/dashboard/${User.username}-projects/${name}`)

}
  return (
    <>
      <div className="w-full h-fit  flex items-center justify-between gap-2 ">
        <Command className=" bg-white dark:bg-[#0A0A0A]  ">
          <CommandInput
            onClick={() => setOpen(true)}
            placeholder="Click for search..."
          />
        </Command>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search all projects..." />
          
          <CommandList className=" max-h-96 overflow-y-auto">
            <CommandEmpty>No Result found</CommandEmpty>
            <CommandGroup heading="Projects">
            {Project?.map((project, index) => (
              <CommandItem className="cursor-pointer flex items-center  gap-2 dark:hover:bg-zinc-900 hover:bg-zinc-100 hover:rounded" onSelect={() => onclick(project.name)} key={index}>
                <div className=" flex items-center " >
                <Avatar className=" rounded-none  ">
                <AvatarImage className=" w-7 h-7" src={`/frameworks/${project.framework}.svg`}/>
                <AvatarFallback><Skeleton/></AvatarFallback>
              </Avatar>
              <span> {project.name}</span>
                </div>
                
                </CommandItem>
            ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              <p className=" sm:flex hidden "> Add new...</p>
              <ChevronDown className=" ml-2 h-4 w-4 sm:flex hidden" />
              <Plus
                className=" flex sm:hidden h-4 w-4 opacity-85 "
                strokeWidth={1.2}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onOpen("createProject", { User })}>
              Project
            </DropdownMenuItem>
            <DropdownMenuItem>Domain</DropdownMenuItem>
            <DropdownMenuItem>Store</DropdownMenuItem>
            <DropdownMenuItem>Team Member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default SearchBar;
