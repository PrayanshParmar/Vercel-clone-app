
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "./ui/button";

const SearchBar = () => {
  return (
    <>
      <div className=" max-w-[1300px] w-full h-fit  flex items-center justify-between gap-2 "  >
        <Command className=" bg-white dark:bg-[#0A0A0A]  ">
          <CommandInput placeholder="Type a command or search..." />
          {/* <CommandEmpty>No results found.</CommandEmpty>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem> */}
        </Command>
        <DropdownMenu>
          <DropdownMenuTrigger asChild  >
             <Button variant="default" > 
              <p className=" sm:flex hidden "> Add new...</p>
              <ChevronDown className=" ml-2 h-4 w-4 sm:flex hidden" />
              <Plus
                className=" flex sm:hidden h-4 w-4 opacity-85 "
                strokeWidth={1.2}
              />
            </Button> 
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#0A0A0A] dark:bg-[#FAFAFA] dark:text-black text-white ">
            <DropdownMenuItem>Project</DropdownMenuItem>
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
