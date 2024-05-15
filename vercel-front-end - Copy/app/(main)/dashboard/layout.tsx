import NavBar from "@/components/navbar";
import React from "react";

const Dasahboardlayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className=" h-full w-full">
      <NavBar />
      <div className=" w-full h-full flex items-center justify-center max-2xl:px-2">
      <div className=" max-w-[1360px] w-full h-full flex flex-col space-y-4 ">
        {children}
        </div>
      </div>
    </main>
  );
};

export default Dasahboardlayout;
