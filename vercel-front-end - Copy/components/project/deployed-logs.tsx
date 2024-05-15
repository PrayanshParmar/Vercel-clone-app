"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { extractTime } from "@/lib/date-time-split";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "../ui/accordion";

interface DeployedLogsprops {
  deployId: string;
}

interface LogItem {
  event_id: string;
  log: string;
  timestamp: string;
}

const DeployedLogs = ({ deployId }: DeployedLogsprops) => {
  const fetchlogs = async () => {
    const response = await fetch(
      `http://localhost:9000/api/v1/logs/${deployId}`
    );
    return response.json();
  };

  const { data, isPending, error, status } = useQuery({
    queryKey: ["logs", deployId],
    queryFn: fetchlogs,
    refetchInterval: 1000,
    enabled: !!deployId,
  });

  return (
    <Accordion
      disabled={isPending}
      className="  border rounded-2xl  "
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className=" rounded-t-2xl hover:no-underline px-2 bg-white dark:bg-[#0A0A0A]  border-b">
          Building
        </AccordionTrigger>
        <AccordionContent className=" pb-0 " >
          <Table>
            <TableBody>
              {data?.logs.map((logItem: LogItem) => (
                <TableRow key={logItem.event_id}>
                  <TableCell>{extractTime(logItem.timestamp)}</TableCell>
                  <TableCell>{logItem.log}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className=" hover:no-underline px-2 bg-white dark:bg-[#0A0A0A]  border-b">
          Deployment Summay
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-none" value="item-3">
        <AccordionTrigger className=" rounded-b-2xl hover:no-underline px-2 bg-white dark:bg-[#0A0A0A]">
          Assigning Custome Domains
        </AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DeployedLogs;
