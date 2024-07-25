import { createClient } from "redis";

const REDIS_HOST = "redis-11279.c1.us-west-2-2.ec2.redns.redis-cloud.com"
const REDIS_PORT = 11279
const REDIS_PASSWORD="ITy9zcYZXRnZ6uBQ0kMpCdgivVkMso9U"
// const REDIS_HASH_NAME = "cubers"

const client = createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})

client.on('error', (err) => console.log(err))

if (!client.isOpen) { client.connect() }

export { client }