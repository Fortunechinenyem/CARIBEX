import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

const connectDB = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();
  cachedClient = client;
  cachedDb = db;

  return { client, db };
};

export default connectDB;
