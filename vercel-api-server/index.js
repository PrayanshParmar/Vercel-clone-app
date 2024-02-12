const express = require("express");
const app = express();
require("dotenv").config();
const ecsClient = require("./config/aws.ecs.connector");
const { RunTaskCommand } = require("@aws-sdk/client-ecs");
const clusterConfig  = require("./config/cluster.config");
const { generateSlug } = require("random-word-slugs");
const PORT = String(process.env.PORT);

app.use(express.json());
app.post("/project", async (req, res) => {
    const {gitURL}  = req.body;
  const projectSlug = generateSlug();
  const command = new RunTaskCommand({
    cluster: clusterConfig.CLUSTER,
    taskDefinition: clusterConfig.TASK,
    launchType: "FARGATE",
    count: 1,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: [
          String(process.env.SUBNET_1),
          String(process.env.SUBNET_2),
          String(process.env.SUBNET_3),
        ],
        securityGroups: [String(process.env.SECURITY_GROUPS)],
        assignPublicIp: "ENABLED",
      },
    },
    overrides: {
      containerOverrides: [
        {
          name: String(process.env.CONTAINER_OVERRIDES_NAME),
          environment: [
            { name: "GIT_REPOSITORY__URL", value: gitURL },
            { name: "PROJECT_ID", value: projectSlug },
          ],
        },
      ],
    },
  });
  await ecsClient.send(command);

    return res.json({ status: 'queued', data: { projectSlug, url: `http://${projectSlug}.localhost:8000` } })
});

app.listen(PORT, () => {
  console.log(`API server running on ${PORT}`);
});
