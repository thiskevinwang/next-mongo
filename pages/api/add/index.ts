import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, Db } from "mongodb"

let cachedDb: Db

async function connectToDatabase(uri: string): Promise<Db> {
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isPost = req.method === "POST"
  if (!isPost) return

  const parsedBody = JSON.parse(req.body)

  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING)
    const collection = db.collection(process.env.COLLECTION_NAME)
    await collection.insertOne(parsedBody)

    res.status(200).json(parsedBody)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
