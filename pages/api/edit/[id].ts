import { NextApiRequest, NextApiResponse } from "next"

import { connectToDatabase } from "../../../utils/connectToDatabase"
import { ObjectId } from "mongodb"

export default async function editEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const parsedBody = JSON.parse(req.body)
  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING as string)

    const collection = db.collection(process.env.COLLECTION_NAME as string)
    const updated = await collection.findOneAndUpdate(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          ...parsedBody,
          properties: [...parsedBody.properties].sort(),
          platforms: [...parsedBody.platforms].sort(),
        },
      }
    )
    res.status(200).json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
