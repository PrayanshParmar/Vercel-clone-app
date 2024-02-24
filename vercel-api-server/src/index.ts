import express from "express";
const app = express();
import routes from "./routes";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import clickHouseClient from "./config/clickhouse.connector";
import kafkaClient from "./config/kafka.connector";

const PORT = String(process.env.PORT);

app.use(express.json());

const consumer = kafkaClient.consumer({ groupId: "api-server-logs-consumer" });

app.use("/", routes());

async function initKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topics: ["container-logs"], fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachBatch: async function ({
      batch,
      heartbeat,
      commitOffsetsIfNecessary,
      resolveOffset,
    }) {
      const messages = batch.messages;
      console.log(`Receive, ${messages.length} messages...`);
      for (const message of messages) {
        if (!message.value) continue;
        const stringMessage = message.value.toString("utf-8");
        const { PROJECT_ID, DEPLOYMENT_ID, log } = JSON.parse(stringMessage);
        console.log({ log, DEPLOYMENT_ID });
        try {
          const { query_id } = await clickHouseClient.insert({
            table: "log_events",
            values: [{ event_id: uuidv4(), deployment_id: DEPLOYMENT_ID, log }],
            format: "JSONEachRow",
          });
          console.log(query_id);
          resolveOffset(message.offset);
          //@ts-ignore
          await commitOffsetsIfNecessary(message.offset);
          await heartbeat();
        } catch (err) {
          console.log("Error", err);
        }
      }
    },
  });
}

initKafkaConsumer();

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
