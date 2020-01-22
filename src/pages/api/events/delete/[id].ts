import { NextApiRequest, NextApiResponse } from "next"

import { connectToDatabase } from "utils/connectToDatabase"
import { ObjectId } from "mongodb"

export default async function editEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const isDelete = req.method === "DELETE"
  if (!isDelete) throw new Error("That's not a DELETE request")

  const { id } = req.query
  const parsedBody = JSON.parse(req.body)
  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING as string)

    const collection = db.collection(process.env.COLLECTION_NAME as string)
    await collection.deleteOne({
      _id: new ObjectId(id as string),
    })
    // return the deleted object in the response
    // in case it wants to be saved to state /s revived
    res.status(200).json(parsedBody)
  } catch (err) {
    console.error(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
