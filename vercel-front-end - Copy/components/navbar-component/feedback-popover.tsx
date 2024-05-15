"use client";
import { Button } from "../ui/button";
import { useModel } from "@/hooks/use-model-store";


const FeedbackPopover = () => {

  const { onOpen} = useModel();
  return(
    <Button onClick={() => onOpen("feedBack")} variant="ghost" className=" h-[32px]  px-2">
    Feedback
  </Button>
  )
   ;
};

export default FeedbackPopover;