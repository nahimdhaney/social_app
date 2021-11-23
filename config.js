const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: {
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secret",
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'root',
        database: process.env.MYSQL_DB || 'node_curso',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost',
    },
    cacheService: {
        port: process.env.CACHE_SRV_PORT || 3003,
        host: process.env.CACHE_SRV_HOST || 'localhost',
    },
    redis: {
        host: process.env.REDIS_HOST || 'yourredishost',
        port: process.env.REDIS_PORT || 111222,
        password: process.env.REDIS_PASS || 'yourpassonredis',
    }
}