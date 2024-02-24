import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";

const kafkaClient = new Kafka({
  clientId: `api-server`,
  brokers: [String(process.env.KAFKA_URL)],
  ssl: {
    ca: [fs.readFileSync(path.join(__dirname, "kafka.pem"), "utf-8")],
  },
  sasl: {
    username: String(process.env.KAFKA_ADMIN),
    password: String(process.env.KAFKA_PASSWORD),
    mechanism: "plain",
  },
});

export default kafkaClient;
