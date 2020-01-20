import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, Db } from "mongodb"

import { EventDocument } from "../../../interfaces"

let cachedDb: Db

async function connectToDatabase(uri: string): Promise<Db> {
  if (cachedDb) {
    console.log("cachedDb found")
    return cachedDb
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  const db = client.db(process.env.DB_NAME)

  cachedDb = db
  return db
}

export default async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    /**
     * @NOTE
     * - make sure the current IP is whitelisted on MongoDB
     * - dashboard -> security -> Network Access
     */
    const db = await connectToDatabase(process.env.CONNECTION_STRING as string)
    const collection = db.collection(process.env.COLLECTION_NAME as string)
    const events: EventDocument[] = await collection
      .find()
      .skip(0)
      .limit(10)
      .toArray()

    res.status(200).json(events)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
