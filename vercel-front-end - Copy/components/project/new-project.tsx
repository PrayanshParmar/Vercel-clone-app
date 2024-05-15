"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Separator } from "../ui/separator";
import ConfigureProject from "./configure-project";
import DeployedLogs from "./deployed-logs";
import { useState } from "react";

const NewProject = () => {
  const [deployId, setDeployId] = useState("");

  return (
    <>
      <div className=" dark:bg-[#0A0A0A] bg-white border border-b  ">
        <div className=" pt-6 md:pt-[47px]"></div>
        <div className="px-6 flex flex-col   sm:gap-4 justify-start items-start dark:text-gray-300 text-gray-500 ">
          <Link
            href="/dashboard"
            className="dark:text-[#a1a1a1] text-sm flex justify-center items-center gap-[3px] "
          >
            <ArrowLeft className=" w-[14px] h-[14px] pb-[2px] " />
            Back
          </Link>
          <div className=" flex flex-col  items-start justify-start">
            <h1 className=" font-bold text-[40px] dark:text-white text-black ">
              You&apos;re almost done.
            </h1>
            <p className=" text-sm font-medium dark:text-[#a1a1a1]">
              Please follow the steps to configure your Project and deploy it.
            </p>
          </div>
          <div className=" mt-[26px] md:mt-[47px] "></div>
        </div>
      </div>
      <div className=" w-full px-3 md:px-6 flex flex-col items-center justify-center gap-9 pb-6 ">
        <div className=" dark:bg-black bg-white flex  flex-col max-w-[840px] w-full rounded border p-8  ">
          <div className=" text-3xl font-semibold ">Configure Project</div>
          <Separator className=" my-6 " />
          <ConfigureProject setDeployId={setDeployId} />
        </div>
        <div className=" dark:bg-black bg-white flex  flex-col max-w-[840px] w-full rounded border p-8  ">
          <div className=" text-3xl font-semibold ">Deploy</div>
          <Separator className=" my-6 " />
          <DeployedLogs deployId={deployId} />
        </div>
      </div>
    </>
  );
};

export default NewProject;
