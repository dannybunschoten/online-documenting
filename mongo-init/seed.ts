import { MongoClient } from "mongodb";
import checkData from "../src/checkData.json";
import documents from "../src/documents.json";
import staticCheckData from "../src/staticCheckData.json";
import staticCheckGroupData from "../src/staticCheckGroupData.json";

async function seed() {
  const uri = "mongodb://localhost:27017";
  const options = {};

  const client = new MongoClient(uri, options);

  try {
    const connected = await client.connect();
    console.log("Connected to MongoDB");

    const db = connected.db("online-documenting");

    console.log("Clearing existing data...");
    await Promise.all([
      db.collection("checkData").deleteMany({}),
      db.collection("documents").deleteMany({}),
      db.collection("staticCheckData").deleteMany({}),
      db.collection("staticCheckGroupData").deleteMany({}),
    ]);

    console.log("Inserting new data...");
    await Promise.all([
      db.collection("checkData").insertOne(checkData),
      db.collection("documents").insertOne(documents),
      db.collection("staticCheckData").insertOne(staticCheckData),
      db.collection("staticCheckGroupData").insertOne(staticCheckGroupData),
    ]);

    console.log("Seeding complete!");
  } finally {
    await client.close();
  }
}

(async () => {
  await seed();
})();
