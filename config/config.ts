import dotenv from "dotenv";
dotenv.config();

const SERVER_PORT = process.env.PORT || 9000;
const SERVER_HOSTNAME = process.env.HOSTNAME || "localhost";
const DB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "BuyItDatabase";
const SERVER_TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || 1800;
const SERVER_TOKEN_SECRET = process.env.TOKEN_SECRET || "verySecr3t!";
const STRIPE_PUBLISHABLE_KEY =
  process.env.STRIPE_PK || "get-your-own-stripe-pk";
const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET || "get-your-own-stripe-secret";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  dbURI: DB_URI,
  dbName: DB_NAME,
  token: {
    expireTime: SERVER_TOKEN_EXPIRES,
    secret: SERVER_TOKEN_SECRET,
  },
  stripe: {
    pubkey: STRIPE_PUBLISHABLE_KEY,
    secret: STRIPE_SECRET_KEY,
  },
};

const config = {
  server: SERVER,
};

export default config;
