"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { extractTime } from "@/lib/date-time-split";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import axios from "axios";
import useLogsStore from "@/hooks/use-log-store";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface DeployedLogsProps {
  deployId: string;
  projectId: string;
  setFetchingComplete: (status: boolean) => void;
  user: User;
}

interface LogItem {
  event_id: string;
  log: string;
  timestamp: string;
  status: string;
  deployId: string;
}

const DeployedLogs = ({ deployId, projectId, setFetchingComplete, user }: DeployedLogsProps) => {
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { errorOrReadyLog, setErrorOrReadyLog, resetLog } = useLogsStore(); // Use Zustand store
  const router = useRouter();
  const fetchLogs = async () => {
    const response = await fetch(
      `http://localhost:9000/api/v1/logs/${deployId}`
    );
    return response.json();
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["logs", deployId],
    queryFn: fetchLogs,
    refetchInterval: shouldFetch ? 1000 : false,
    enabled: !!deployId,
  });

  const updateDeployment = async (data: LogItem) => {
    await axios.put("/api/project/deploy", { data });
  };

  const mutation = useMutation({
    mutationFn: updateDeployment,
    onSuccess: () => {
      resetLog();
      router.push(`/new/${user.username}-projects/success?project-id=${projectId}&deployment-id=${deployId}`)
      
    },
  });

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }

    if (
      data?.logs.some((logItem: LogItem) =>
        ["ERROR", "READY"].includes(logItem.status)
      )
    ) {
      const latestLog = data.logs.find((logItem: LogItem) =>
        ["ERROR", "READY"].includes(logItem.status)
      );
      if (latestLog) {
        setErrorOrReadyLog({ ...latestLog, deployId }); // Store the entire log item
        setShouldFetch(false);
        setFetchingComplete(true);
        mutation.mutate(latestLog);
      }
    }
  }, [data]);

  return (
    <Accordion
      disabled={isPending}
      className="border rounded-2xl"
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="rounded-t-2xl hover:no-underline px-2 bg-white dark:bg-[#0A0A0A] border-b">
          <div className="flex items-center gap-[6px]">
            {errorOrReadyLog?.status === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {errorOrReadyLog?.status === "READY" && (
              <CheckCircle2 className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(errorOrReadyLog?.status || "") && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
            <span className="line-clamp-1 text-sm sm:text-base">Building</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-0">
          <div
            ref={logContainerRef}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table>
              <TableBody>
                {data?.logs.map((logItem: LogItem) => (
                  <TableRow key={logItem.event_id}>
                    <TableCell className="px-4 py-2">
                      {extractTime(logItem.timestamp)}
                    </TableCell>
                    <TableCell className="px-4 py-2">{logItem.log}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:no-underline px-2 bg-white dark:bg-[#0A0A0A] border-b">
          <div className="flex items-center gap-[6px]">
            {errorOrReadyLog?.status === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {errorOrReadyLog?.status === "READY" && (
              <CheckCircle2 className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(errorOrReadyLog?.status || "") && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
            <span className="line-clamp-1 text-sm sm:text-base">
              Deployment Summary
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          {errorOrReadyLog?.status === "ERROR" && (
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Configure Project
            </button>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger className="rounded-b-2xl hover:no-underline px-2 bg-white dark:bg-[#0A0A0A]">
          <div className="flex items-center gap-[6px]">
            {errorOrReadyLog?.status === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {errorOrReadyLog?.status === "READY" && (
              <CheckCircle2 className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(errorOrReadyLog?.status || "") && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
            <span className="line-clamp-1 text-sm sm:text-base">
              Assigning Custom Domains
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-3 px-[38px] flex items-center justify-between">
          <span>custom domain</span>
          {/* <Link href={} >Manage</Link> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DeployedLogs;
