import { MongoClient } from "mongodb";

const url = "mongodb+srv://seunghwan:asd123654@ysh.ha5071y.mongodb.net/";
let connectDB: Promise<MongoClient>;

declare global {
  var _mongo: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongo) {
    globalThis._mongo = new MongoClient(url).connect();
  }
  connectDB = globalThis._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
