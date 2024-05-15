"use client";

import { useEffect, useState } from "react";
import CreateProjectModel from "../models/create-project-model";
import { FeedBack } from "../models/feedback-model";
import RootDirectoryModel from "../models/root-directory-model";




export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateProjectModel />
      <FeedBack/>
      <RootDirectoryModel/>

    </>
  );
};
