import * as React from "react"
import Link from "next/link"
import Layout from "../../components/Layout"
import { NextPage } from "next"

const Add: NextPage = () => {
  return (
    <Layout title="Analytics | Add">
      <h1>Add a New Event</h1>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default Add
