const { Redis } = require("ioredis");

const redisPublisher = new Redis(String(process.env.REDIS_URL))

module.exports = redisPublisher;