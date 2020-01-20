import { NextApiRequest, NextApiResponse } from "next"

import { connectToDatabase } from "../../../utils/connectToDatabase"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const isPost = req.method === "POST"
  if (!isPost) return

  const parsedBody = JSON.parse(req.body)

  try {
    const db = await connectToDatabase(process.env.CONNECTION_STRING as string)
    const collection = db.collection(process.env.COLLECTION_NAME as string)
    await collection.insertOne(parsedBody)

    res.status(200).json(parsedBody)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
