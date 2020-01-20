import { NextApiRequest, NextApiResponse } from "next"
import { ObjectId } from "mongodb"

import { connectToDatabase } from "../../../utils/connectToDatabase"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING as string)
    const collection = db.collection(process.env.COLLECTION_NAME as string)
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
    const event = await collection.findOne({ _id: new ObjectId(id as string) })

    res.status(200).json(event)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
