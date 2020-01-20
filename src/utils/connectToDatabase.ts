import { Db, MongoClient } from "mongodb"

let cachedDb: Db

export async function connectToDatabase(uri: string): Promise<Db> {
  if (cachedDb) {
    console.log("cachedDb found")
    return cachedDb
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db(process.env.DB_NAME)

  cachedDb = db
  return db
}
