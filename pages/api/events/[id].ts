import { NextApiRequest, NextApiResponse } from "next"
import { MongoClient, Db, ObjectId } from "mongodb"

let cachedDb: Db

async function connectToDatabase(uri: string): Promise<Db> {
  if (cachedDb) {
    console.log("cachedDb found")
    return cachedDb
  }
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })
  const db = client.db(process.env.DB_NAME)

  cachedDb = db
  return db
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING)
    const collection = db.collection(process.env.COLLECTION_NAME)
    /**
     * `findOne(query, projection)`
     * @see https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
     *
     * - `query`
     * @see https://docs.mongodb.com/manual/reference/operator/query/
     *
     * - finding a document byId
     * `.findOne(ObjectId(id))`
     * */
    const event = await collection.findOne(new ObjectId(id as string))
    console.log("event", event)

    res.status(200).json(event)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
