import { RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const ProjectDetails = () => {
  return (
    <>
      <div className=" w-full h-[120px] flex flex-col sm:flex-row px-4 max-sm:py-6 items-start sm:items-center justify-center gap-3 sm:gap-0 sm:justify-between  border-b ">
        <h2 className=" font-medium text-3xl ">react-test</h2>
        <div className=" flex space-x-3 items-center">
          <Button variant="outline">Repository</Button>
          <Button variant="outline">Domains</Button>
          <Button variant="default">Visit</Button>
        </div>
      </div>
      <div className="pt-12 w-full px-4  border-b flex flex-col items-center justify-center gap-3" >
      <div className="w-full flex items-center  justify-between ">
        <div className=" flex flex-col items-start space-y-2">
          <h3 className="font-medium text-2xl">Production Deployment</h3>
          <span className=" dark:text-[#A1A1A1] text-sm">
            The deployment that is available to your visitors.
          </span>
        </div>
        <div className=" hidden md:flex gap-2  items-center justify-center">
          <Button size="sm" variant="outline">
            Build logs
          </Button>
          <Button size="sm" variant="outline">
            Runtime logs
          </Button>
          <Button size="sm" variant="default">
            <RotateCw size="sm" className="mr-2 h-4 w-4 animate-spin" />
            Instant Rollback
          </Button>
        </div>
        <div className=" flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none " asChild>
              <Button variant="ghost" size="sm">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Build logs</DropdownMenuItem>
              <DropdownMenuItem>Runtime logs</DropdownMenuItem>
              <DropdownMenuItem>Instant Rollback</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full dark:bg-[#0A0A0A] bg-white rounded-md border p-6">
        <div className=" w-full flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div>hy</div>
        <div className=" w-full flex flex-col items-center justify-start gap-3 text-sm ">
            <div className=" w-full flex flex-col ">
                <div className="dark:text-[#A1A1A1]" >Deployment</div>
                <Link rel="noopener noreferrer" target="_blank" href={""} className="line-clamp-1 hover:underline underline-offset-0 font-medium" >vercel-clone-lkazp9rgl-prayanshs-projects.vercel.app</Link>
            </div>
            <div className=" w-full flex flex-col ">
                <div className="dark:text-[#A1A1A1]" >Domains</div>
                <Link rel="noopener noreferrer" target="_blank" href={""} className="line-clamp-1 hover:underline underline-offset-0 font-medium" >hostiffy.xyz</Link>
            </div>
            <div className=" w-full flex flex-col ">
                <div className="  " ></div>
                <div className="dark:text-[#A1A1A1]">Deployment</div>
                <div className=" font-medium " >ju</div> 
            </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProjectDetails;
