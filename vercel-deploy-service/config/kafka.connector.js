const { Kafka } = require('kafkajs')
const fs = require('fs');
const path = require('path');

const kafkaConnector = new Kafka({
  clientId: `docker-deploy-service-${process.env.DEPLOYMENT_ID}`,
  brokers: [String(process.env.KAFKA_URL)],
  ssl: {
    ca: [fs.readFileSync(path.join(__dirname, 'kafka.pem'), 'utf-8')]
  },
  sasl: {
    username: String(process.env.KAFKA_ADMIN),
    password: String(process.env.KAFKA_PASSWORD),
    mechanism: "plain"
  }
})

module.exports = kafkaConnector;