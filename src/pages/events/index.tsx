import * as React from "react"
import Link from "next/link"
import Layout from "../../components/Layout"
import useSwr from "swr"

import { EventDocument } from "../../../interfaces"

function fetcher(url: string) {
  return fetch(url).then(r => r.json())
}

const Events: React.FC = () => {
  const { data, error } = useSwr<EventDocument[]>("/api/events", fetcher)

  if (!data) return <>"Loading..."</>
  if (error) return <>`Error: ${error}`</>
  console.log(data)

  return (
    <Layout title="Event | Next.js">
      <h1>Analytics Events</h1>
      <p>All Events</p>
      {(Array.isArray(data) ? data : []).map((e, i) => (
        <div key={e._id} style={{ background: i % 2 === 0 ? "lightgrey" : "" }}>
          <Link href={`/events/[id]`} as={`/events/${e._id}`}>
            <a>{e.name}</a>
          </Link>
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
