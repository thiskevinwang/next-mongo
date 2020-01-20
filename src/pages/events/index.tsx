import * as React from "react"
import Link from "next/link"
import styled from "styled-components"
import useSwr from "swr"

import { EventDocument } from "../../interfaces"
import Layout from "../../components/Layout"

const Table = styled.table`
  border-collapse: collapse;

  thead {
    text-align: left;
  }
  tr {
    border-bottom: 1px solid ${props => props.theme.borderBottom};

    &:nth-of-type(odd) {
      background: none;
    }
    &:nth-of-type(even) {
      background: var(
        ${props => (props.theme.isDarkMode ? `--accents-8` : `--accents-1`)}
      );
    }
    &:first-child {
      background: var(
        ${props => (props.theme.isDarkMode ? `--accents-8` : `--accents-1`)}
      );
    }
  }

  th,
  td {
    padding: 0.5rem;
  }
`

function fetcher(url: string) {
  return fetch(url).then(r => r.json())
}

const Events: React.FC = () => {
  const { data, error } = useSwr<EventDocument[]>("/api/events", fetcher)

  if (!data) return <>"Loading..."</>
  if (error) return <>`Error: ${error}`</>

  return (
    <Layout title="Event | Next.js">
      <h2>Analytics Events</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Properties</th>
            <th>Platforms</th>
            <th>Description</th>
            <th>Group</th>
          </tr>
        </thead>
        {(Array.isArray(data) ? data : []).map(e => (
          <tr key={e._id}>
            <td>
              <code>
                <Link href={`/events/[id]`} as={`/events/${e._id}`}>
                  <a>{e.name}</a>
                </Link>
              </code>
            </td>
            <td>
              {e.properties?.map(property => (
                <code>
                  {property}
                  <br />
                </code>
              ))}
            </td>
            <td>
              {e.platforms?.map(platform => (
                <code>{platform}</code>
              ))}
            </td>
            <td>
              <p>
                <i>{e.description}</i>
              </p>
            </td>
            <td>
              <code>{e.group ?? "-"}</code>
            </td>
          </tr>
        ))}
      </Table>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default Events
