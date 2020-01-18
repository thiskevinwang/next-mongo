import * as React from "react"
import Link from "next/link"
import Layout from "../../components/Layout"
import useSwr from "swr"

function fetcher(url: string) {
  return fetch(url).then(r => r.json())
}

/**
 * This is the shape of a single `document` in the
 * `names` collection in the `analytics` mongo database.
 */
interface EventDocument {
  _id: string
  name: string
  properties?: string[]
  description: string
}

const Events: React.FC = () => {
  const { data, error } = useSwr<EventDocument[]>("/api/events", fetcher)

  if (!data) return <>"Loading..."</>
  if (error) return <>`Error: ${error}`</>
  console.log(data)

  return (
    <Layout title="Event | Next.js">
      <h1>Analytics Events</h1>
      <p>Here are our Analytics Events</p>
      {(Array.isArray(data) ? data : []).map((e, i) => (
        <div key={e._id} style={{ background: i % 2 === 0 ? "lightgrey" : "" }}>
          <Link href={`/events/${e._id}`}>{e.name}</Link>
        </div>
      ))}
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default Events
