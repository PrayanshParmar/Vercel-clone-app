const clusterConfig = {
    CLUSTER: String(process.env.CLUSTER_ARN),
    TASK: String(process.env.TASK_ARN),
};

module.exports = clusterConfig;