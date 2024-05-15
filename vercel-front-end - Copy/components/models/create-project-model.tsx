"use client";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useModel } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { imagePath } from "@/lib/image-path";
import ThemedImage from "../themed-image";
import { Skeleton } from "../ui/skeleton";
import ProjectModelSKL from "../skeletons/project-model-skl";

interface Project {
  id: number;
  full_name: string;
  owner: {
    avatar_url: string;
  };
  name: string;
  url: string;
}

const CreateProjectModel = () => {
  const { isOpen, onClose, type, data } = useModel();
  const { User } = data;
  const isModelOpen = isOpen && type === "createProject";
  const [projectData, setprojectData] = useState<Project[]>([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Project[]>(
          `https://api.github.com/users/${User?.username}/repos`
        );
        setprojectData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isModelOpen]);

  const handleClose = () => {
    onClose();
  };

  const importRepo = (project: Project) => {
    router.push(
      `/new/${User?.username}-projects?giturl=${project.url}&name=${project.name}&full_name=${project.full_name}`
    );
    onClose();
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white dark:bg-[#0A0A0A] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium sm:text-2xl text-center">
            Import Git Repository
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full h-fit p-[2px] flex flex-row items-center justify-center border rounded-md">
            <div className="flex items-center gap-2 pl-[2px]">
              <Avatar className="w-[20px] h-[20px]">
                <AvatarImage src={User?.imageUrl} />
                <AvatarFallback>
                  <Skeleton />
                </AvatarFallback>
              </Avatar>
              <span className="capitalize">{User?.username}</span>
            </div>
          </div>
          {isLoading ? (
            <ProjectModelSKL />
          ) : projectData.length === 0 ? ( // Check if projectData is empty
            <p className="text-center text-gray-500">
              No GitHub repositories found.
            </p>
          ) : (
            <ScrollArea className="max-h-64 h-fit">
              {projectData.map((project) => (
                <div
                  key={project.id}
                  className="w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <ThemedImage
                      src={{
                        light: imagePath.github.light,
                        dark: imagePath.github.dark,
                      }}
                      height={20}
                      width={20}
                    />
                    <span className="capitalize">{project.name}</span>
                  </div>
                  <div className="ml-auto">
                    <Button onClick={() => importRepo(project)}>Import</Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModel;
