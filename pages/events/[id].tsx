import { NextPageContext, NextPage } from "next"
import Link from "next/link"

import Layout from "../../components/Layout"
import { sampleFetchWrapper } from "../../utils/sample-api"
import { EventDocument } from "../../interfaces"

interface Props {
  event?: EventDocument
}

const EventById: NextPage<Props> = ({ event }) => {
  return (
    <Layout>
      <div>
        {event ? (
          <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <div style={{ marginTop: `1rem`, marginBottom: `1rem` }}>
              <h2>Properties</h2>
              {event.properties?.map((e, i) => (
                <code key={i} style={{ margin: `1rem` }}>
                  {e}
                </code>
              ))}
            </div>
            <div style={{ marginTop: `1rem`, marginBottom: `1rem` }}>
              <h2>Platforms</h2>
              {event.platforms?.map((e, i) => (
                <code key={i} style={{ margin: `1rem` }}>
                  {e}
                </code>
              ))}
            </div>
          </div>
        ) : (
          <>Event not found</>
        )}
      </div>
      <Link href="/events">Back to Events</Link>
    </Layout>
  )
}

EventById.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const { id } = query
    const event = await sampleFetchWrapper(
      `http://localhost:3000/api/events/${Array.isArray(id) ? id[0] : id}`
    )
    return { event }
  } catch (err) {
    return { errors: err.message }
  }
}

export default EventById
