"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { extractTime } from "@/lib/date-time-split";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";
import { AlertCircle, CheckCircle, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";

interface DeployedLogsProps {
  deployId: string;
}

interface LogItem {
  event_id: string;
  log: string;
  timestamp: string;
  status: string;
}

const DeployedLogs = ({ deployId }: DeployedLogsProps) => {
  const logContainerRef = useRef<HTMLDivElement>(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [lastStatus, setLastStatus] = useState<string>("");
  const fetchLogs = async () => {
    const response = await fetch(
      `http://localhost:9000/api/v1/logs/${deployId}`
    );
    return response.json();
  };

  const { data, isPending, error, status, refetch } = useQuery({
    queryKey: ["logs", deployId],
    queryFn: fetchLogs,
    refetchInterval: shouldFetch ? 1000 : false,
    enabled: !!deployId,
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
      const latestStatus = data.logs.find((logItem: LogItem) =>
        ["ERROR", "READY"].includes(logItem.status)
      )?.status;
      setLastStatus(latestStatus || null);
      setShouldFetch(false);
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
          <div className=" flex items-center gap-[6px]">
            {lastStatus === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {lastStatus === "READY" && (
              <CheckCircle2  className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(lastStatus) && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
            <span className=" line-clamp-1 text-sm sm:text-base" >Building</span>
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
        <div className=" flex items-center gap-[6px]">
            {lastStatus === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {lastStatus === "READY" && (
              <CheckCircle2  className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(lastStatus) && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
         <span className=" line-clamp-1 text-sm sm:text-base" >
          Deployment Summary
          </span>
          </div>
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger className="rounded-b-2xl hover:no-underline px-2 bg-white dark:bg-[#0A0A0A]">
        <div className=" flex items-center gap-[6px]">
            {lastStatus === "ERROR" && (
              <AlertCircle className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-red-600" />
            )}
            {lastStatus === "READY" && (
              <CheckCircle2  className="w-6 h-6 text-white dark:text-[#0A0A0A] fill-blue-600" />
            )}
            {!["ERROR", "READY"].includes(lastStatus) && (
              <Circle className="w-5 h-5 dark:text-[#a1a1a1]" />
            )}
         <span className=" line-clamp-1 text-sm  sm:text-base" >
          Assigning Custom Domains
          </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className=" py-3 px-[38px] flex items-center justify-between " >
            <span>
              custome domain
              </span>
              {/* <Link href={} >Manage</Link> */}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DeployedLogs;
