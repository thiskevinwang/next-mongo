import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import useSwr from "swr"

import Layout from "../../components/Layout"
import { EventDocument } from "../../interfaces"

const EventById: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: event, error } = useSwr<EventDocument>(
    `/api/events/${id}`,
    url => fetch(url).then(r => r.json())
  )

  if (!event) return <>Loading</>
  if (error) return <>Error</>

  return (
    <Layout title={"Event Details"}>
      <div>
        <h2>Event Details</h2>
        <h3>Name</h3>
        <code
          style={{
            marginLeft: `1rem`,
            marginRight: `1rem`,
            display: `inline-block`,
          }}
        >
          {event.name}
        </code>

        <h3>Description</h3>
        <p>{event.description}</p>
        <div
          style={{
            marginTop: `1rem`,
            marginBottom: `1rem`,
          }}
        >
          <h3>Properties</h3>
          {event.properties?.map((e, i) => (
            <code
              key={i}
              style={{
                marginLeft: `1rem`,
                marginRight: `1rem`,
                display: `inline-block`,
              }}
            >
              {e}
            </code>
          ))}
        </div>
        <div style={{ marginTop: `1rem`, marginBottom: `1rem` }}>
          <h3>Platforms</h3>
          {event.platforms?.map((e, i) => (
            <code
              key={i}
              style={{
                marginLeft: `1rem`,
                marginRight: `1rem`,
                display: `inline-block`,
              }}
            >
              {e}
            </code>
          ))}
        </div>
      </div>

      <Link href="/events/[id]/edit" as={`/events/${id}/edit`}>
        <a>Edit</a>
      </Link>
      <br />
      <Link href="/events">
        <a>Back to Events</a>
      </Link>
    </Layout>
  )
}

export default EventById
