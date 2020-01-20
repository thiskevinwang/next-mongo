import * as React from "react"
import Link from "next/link"
import Layout from "../../components/Layout"
import { NextPage } from "next"

const IndexPage: NextPage = () => {
  return (
    <Layout title="Analytics | Home">
      <h1>Home</h1>
      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage
