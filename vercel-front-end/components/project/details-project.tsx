"use client";
import { AlertCircle, GitBranch, RotateCw } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { convertToDaysAgo } from "@/lib/date-to-ago";
import ProjectSKL from "../skeletons/project-skl";

interface UserProps {
  User: User;
}

const ProjectDetails = ({ User }: UserProps) => {
  const params = useParams<{ projectName: string }>();

  const fetchProject = async () => {
    const response = await fetch(`/api/project/${params.projectName}`);
    return response.json();
  };

  const { data, error, status } = useQuery({
    queryKey: ["project", params.projectName],
    queryFn: fetchProject,
    enabled: !!params.projectName,
  });

  if (status === "pending") {
    return <ProjectSKL />;
  }

  if (status === "error") {
    return (
      <div className=" w-full h-full flex flex-col items-center justify-start mt-52 space-y-3 ">
        <AlertCircle width={50} height={50} className=" fill-red-500" />
        Something went wrong
      </div>
    );
  }

  if (data.message) {
    if (data.message === "Project Not Found") {
      return <div className="w-full h-full flex flex-col items-center justify-start mt-52 space-y-3">Project Not Found</div>;
    }
    else if (data.message === "Internal Error") {
      return <div className="w-full h-full flex flex-col items-center justify-start mt-52 space-y-3">Internal Error</div>;
    }
    else if (data.message === "Unauthorized Access"){
      return <div className="w-full h-full flex flex-col items-center justify-start mt-52 space-y-3">Unauthorized Access</div>;
    }
  }

  return (
    <>
      <div className="w-full h-[120px] flex flex-col sm:flex-row px-8 max-sm:py-6 py-4 items-start sm:items-center justify-center gap-3 sm:gap-0 sm:justify-between border-b">
        <h2 className="font-medium text-3xl">{data.name}</h2>
        <div className="flex space-x-3 items-center">
          <Button variant="outline" asChild>
            <Link
              className=" flex gap-[2px] "
              rel="noopener noreferrer"
              target="_blank"
              href={data.gitUrl}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Repository
            </Link>
          </Button>
          <Button variant="outline">Domains</Button>
          <Button variant="default" asChild>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={`https://${data.subDomain}.hostiffy.xyz`}
            >
              Visit
            </Link>
          </Button>
        </div>
      </div>
      <div className="pt-12 w-full px-8 border-b flex flex-col items-center justify-center gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-medium text-2xl">Production Deployment</h3>
            <span className="dark:text-[#A1A1A1] text-sm">
              The deployment that is available to your visitors&#46;
            </span>
          </div>
          <div className="hidden md:flex gap-2 items-center justify-center">
            <Button size="sm" variant="outline">
              Build logs
            </Button>
            <Button size="sm" variant="outline">
              Runtime logs
            </Button>
            <Button size="sm" variant="outline">
              <RotateCw size="sm" className="mr-2 h-4 w-4 " />
              Instant Rollback
            </Button>
          </div>
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none" asChild>
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
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <div className="w-full h-full border rounded-md max-w-[436px] max-h-[272px] overflow-hidden">
              <Image
                src="/meta.jpg"
                alt="webapp screenshot"
                width={436}
                height={272}
                className="object-contain"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-start gap-3 text-sm">
              <div className="w-full flex flex-col gap-[6px]">
                <div className="dark:text-[#A1A1A1]">Deployment</div>
                <Link
                  href={`/dashboard/${User.username}-projects/${data.name}/${data.Deployment[0].id}`}
                  className="line-clamp-1 hover:underline underline-offset-0 font-medium"
                >
                  {data.Deployment[0].id}
                </Link>
              </div>
              <div className="w-full flex flex-col gap-[6px]">
                <div className="dark:text-[#A1A1A1]">Domains</div>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`https://${data.subDomain}.hostiffy.com`}
                  className="line-clamp-1 hover:underline underline-offset-0 font-medium"
                >
                  hostiffy.xyz
                </Link>
              </div>
              <div className="w-full flex items-start justify-start gap-4">
                <div className="flex flex-col gap-[6px]">
                  <div className="dark:text-[#A1A1A1]">Status</div>
                  <div className="font-medium">{data.Deployment[0].status}</div>
                </div>
                <div className="flex flex-col gap-[6px]">
                  <div className="dark:text-[#A1A1A1]">Created</div>
                  <div className="font-medium">
                    {convertToDaysAgo(data.Deployment[0].createdAt)}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="dark:text-[#A1A1A1]">Source</div>
                <div className="flex items-start justify-start gap-2">
                  <GitBranch className="h-4 w-4" />
                  {data.branch}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full dark:bg-[#0A0A0A] bg-white rounded-md border p-6">
          <div className="w-full flex flex-col items-center justify-center gap-3  sm:flex-row sm:justify-between sm:gap-0  ">
            <span className="text-sm dark:text-[#A1A1A1] sm:line-clamp-1">
              To update your Production Deployment&#44; push to the
              &quot;main&quot; branch&#46;
            </span>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
        </div>
        <div className=" w-full h-14"></div>
      </div>
    </>
  );
};

export default ProjectDetails;
