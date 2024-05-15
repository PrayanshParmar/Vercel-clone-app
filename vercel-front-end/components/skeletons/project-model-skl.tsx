import { Skeleton } from "../ui/skeleton";

const ProjectModelSKL = () => {
  return (
    <>
    <div className="max-h-64 h-fit">
              <div className="w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md">
                <div className="flex items-center gap-2">
                  <Skeleton className=" w-5 h-5 rounded-full" />
                  <Skeleton className=" w-[156px] h-6" />
                </div>
                <Skeleton className=" w-[75.68px] h-10" />
              </div>
              <div className="w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md">
                <div className="flex items-center gap-2">
                  <Skeleton className=" w-5 h-5 rounded-full" />
                  <Skeleton className=" w-[156px] h-6" />
                </div>
                <Skeleton className=" w-[75.68px] h-10" />
              </div>
              <div className="w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md">
                <div className="flex items-center gap-2">
                  <Skeleton className=" w-5 h-5 rounded-full" />
                  <Skeleton className=" w-[156px] h-6" />
                </div>
                <Skeleton className=" w-[75.68px] h-10" />
              </div>
              <div className="w-full h-fit p-3 flex flex-row items-center justify-between border rounded-md">
                <div className="flex items-center gap-2">
                  <Skeleton className=" w-5 h-5 rounded-full" />
                  <Skeleton className=" w-[156px] h-6" />
                </div>
                <Skeleton className=" w-[75.68px] h-10" />
              </div>
            </div>
    </>
  ) ;
};

export default ProjectModelSKL;