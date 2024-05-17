import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, GitMerge } from "lucide-react";
import { Badge } from "../ui/badge";
import { imagePath } from "@/lib/image-path";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { convertToDaysAgo } from "@/lib/date-to-ago";
import ThemedImage from "../themed-image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

interface ProjectCardProps {
  name: String;
  subdomain: String;
  gitRepo: String;
  date: Date;
  branch: String;
  full_name: String;
  username: String;
}

const ProjectCard =  ({
  name,
  subdomain,
  gitRepo,
  date,
  branch,
  full_name,
  username
}: ProjectCardProps) => {


  return (
    <Link href={`/dashboard/${username}-projects/${name}`}  passHref>
    <Card  className="dark:bg-[#0A0A0A] bg-white dark:hover:border-white hover:border-black">
      <CardContent>
        <div className=" flex flex-col gap-4 ">
          <div className=" flex items-center justify-between w-full h-full pt-2">
            <div className=" flex items-center  gap-2 ">
              <Avatar className=" rounded-none ">
                <AvatarImage src={imagePath.react} />
                <AvatarFallback><Skeleton/></AvatarFallback>
              </Avatar>
              <div className=" flex flex-col items-start justify-start ">
                <span className=" font-semibold ">{name}</span>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://${subdomain}.hostiffy.xyz`}
                >
                  <div className=" flex items-center  gap-1  dark:text-gray-400 text-gray-600">
                    <div className=" hover:underline peer ">
                      {`${subdomain}.hostiffy.xyz`}
                    </div>
                    <ExternalLink
                      className=" hidden peer-hover:flex pt-[2px]"
                      width={12}
                      height={12}
                    />
                  </div>
                </Link>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none " asChild>
                <Button variant="ghost" size="icon">
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
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/dashboard/${username}-projects/${name}/logs`}
                  >
                    View Logs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/dashboard/${username}-projects/${name}/settings/domains`}
                  >
                    Manage Domains
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/dashboard/${username}-projects/${name}/settings`}
                  >
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <Badge
              variant="secondary"
              className=" dark:bg-[#111]  bg-[#fafafa] h-8 text-semibold "
            >
              <div className=" flex items-center gap-1">
                <ThemedImage
                  src={{
                    light: imagePath.github.light,
                    dark: imagePath.github.dark,
                  }}
                  height={20}
                  width={20}
                />

                {full_name}
              </div>
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className=" flex  items-center justify-center text-sm gap-1 dark:text-gray-400 text-gray-600 ">
          <span>{convertToDaysAgo(String(date))}</span>
          <GitMerge className=" w-4 h-4 " /> <span>{branch}</span>
        </div>
      </CardFooter>
    </Card>
    </Link>
  );
};

export default ProjectCard;
