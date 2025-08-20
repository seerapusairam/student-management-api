const redis = require('redis');
require('dotenv').config();

// Create a Redis client with the connection URL from environment variables
const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

// Event listener for Redis client errors
redisClient.on('error', (err) => {
    console.log("Redis client error", err);
});

// Asynchronous function to connect to the Redis server
const connectRedis = async () => {
    await redisClient.connect();
};

// Export the Redis client and the connect function for use in other modules
module.exports = { redisClient, connectRedis };
