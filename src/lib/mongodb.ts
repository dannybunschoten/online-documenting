import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const options = {};

let clientPromise: Promise<MongoClient> | null = null;

async function getMongoClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return await global._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return await clientPromise;
}

export default getMongoClient;
