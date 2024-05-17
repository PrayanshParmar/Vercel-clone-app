import { Skeleton } from "../ui/skeleton";

const ProjectSKL = () => {
  return (
    <>
      <div className="w-full h-[120px] flex flex-col sm:flex-row px-8 max-sm:py-6 py-4 items-start sm:items-center justify-center gap-3 sm:gap-0 sm:justify-between border-b">
        <Skeleton className=" w-[143.05px] h-9 " />
        <div className="flex space-x-3 items-center">
          <Skeleton className=" w-[122px] h-9" />
          <Skeleton className=" w-[91px] h-9" />
          <Skeleton className=" w-[61px] h-9" />
        </div>
      </div>
      <div className="pt-12 w-full px-8 border-b flex flex-col items-center justify-center gap-3">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-medium text-2xl">Production Deployment</h3>
            <span className="dark:text-[#A1A1A1] text-sm">
              The deployment that is available to your visitors.
            </span>
          </div>
          <div className="hidden md:flex gap-2 items-center justify-center">
            <Skeleton className=" w-[90.91px] h-9" />
            <Skeleton className=" w-[90.91px] h-9" />
            <Skeleton className=" w-[90.91px] h-9" />

          </div>
          <div className="flex md:hidden">
            <Skeleton className=" w-10 h-9" />
          </div>
        </div>
        <div className="w-full dark:bg-[#0A0A0A] bg-white  rounded-md border p-6">
          <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            <Skeleton className="w-[436px] h-[272px]  overflow-hidden" />
            <div className="w-full flex flex-col items-center justify-start gap-3 ">
              <div className="w-full flex flex-col gap-[6px]">
                <Skeleton className=" w-[90px] h-5 " />
                <Skeleton className=" w-[250px] h-5" />
              </div>
              <div className="w-full flex flex-col gap-[6px]">
                <Skeleton className=" w-[90px] h-5 " />
                <Skeleton className=" w-[250px] h-5" />
              </div>
              <div className="w-full flex items-start justify-start gap-4">
                <div className="flex flex-col gap-[6px]">
                  <Skeleton className=" w-[60px] h-5 " />
                  <Skeleton className=" w-[150px] h-5" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <Skeleton className=" w-[60px] h-5 " />
                  <Skeleton className=" w-[150px] h-5" />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className=" w-[90px] h-5 " />
                <Skeleton className=" w-[250px] h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full dark:bg-[#0A0A0A] bg-white rounded-md border p-6">
          <div className="w-full flex flex-col items-center justify-center gap-3  sm:flex-row sm:justify-between sm:gap-0  ">
            <Skeleton className=" w-[427px] h-6 " />
          </div>
        </div>
        <div className=" w-full h-14"></div>
      </div>
    </>
  );
};

export default ProjectSKL;
