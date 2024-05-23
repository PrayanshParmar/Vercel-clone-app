import { Project } from "@prisma/client";

export const getFirstWord = (data: any): string => {
  const txt = data.split("_")[0];
  return txt.toLowerCase();
};

export const frameworktodir = (data: string) => {
  console.log(data);
  if (data === "react" || data === "other") {
    return "build";
  }
  if (data === "remix" || data === "svelte") {
    return "public";
  }
  return "dist";
};

export const rootDirFind = (data: string) => {
  if (data === "./") {
    return "";
  }
  return data;
};
