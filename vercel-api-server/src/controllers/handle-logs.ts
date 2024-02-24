import express from "express";
import clickHouseClient from "../config/clickhouse.connector";

export const getLogs = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.params.id;
  const logs = await clickHouseClient.query({
    query: `SELECT event_id, deployment_id, log, timestamp from log_events where deployment_id = {deployment_id:String}`,
    query_params: {
      deployment_id: id,
    },
    format: "JSONEachRow",
  });

  const rawLogs = await logs.json();

  return res.json({ logs: rawLogs });
};
