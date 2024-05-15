"use client";
import { useModel } from "@/hooks/use-model-store";

import { PlusCircle, UploadCloud } from "lucide-react";
import SearchBar from "../search-bar";
import { User} from "@prisma/client";
interface NotFoundDashboardProps {
  User: User
}


const NotFoundDashboard = ({ User}: NotFoundDashboardProps) => {
  const { onOpen } = useModel();

  return (
    <>
        <div className=" w-full h-fit flex items-center justify-center py-3 ">
          <SearchBar User={User} />
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
            <button
              onClick={() => onOpen("createProject", {User})}
              className=" border rounded-md p-2 text-zinc-500 hover:text-zinc-600 
                    dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            >
              Import
            </button>
          </div>
        </div>
    </>
  );
};

export default NotFoundDashboard;
