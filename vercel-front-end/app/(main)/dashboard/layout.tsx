import React from "react";

const Dasahboardlayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <main className=" h-full w-full">{children}</main>;
};

export default Dasahboardlayout;
