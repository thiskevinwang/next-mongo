import * as React from "react"
import Link from "next/link"
import styled from "styled-components"
import useSwr from "swr"

import { EventDocument } from "../../interfaces"
import Layout from "../../components/Layout"

import { Delete, Edit } from "../../svgs"

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid ${props => props.theme.borderBottom};

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
    <Layout title="Events">
      <h2>Events</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Properties</th>
            <th>Platforms</th>
            <th>Description</th>
            <th>Group</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
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
                  <code key={property}>
                    {property}
                    <br />
                  </code>
                ))}
              </td>
              <td>
                {e.platforms?.map(platform => (
                  <code key={platform}>{platform}</code>
                ))}
              </td>
              <td style={{ maxWidth: `20rem` }}>
                <p>
                  <i>{e.description}</i>
                </p>
              </td>
              <td>
                <code>{e.group ?? "-"}</code>
              </td>
              <td>
                <Link href={`/events/[id]/edit`} as={`/events/${e._id}/edit`}>
                  <a style={{ marginRight: `0.5rem` }}>
                    <Edit />
                  </a>
                </Link>
                <a style={{ marginRight: `0.5rem`, cursor: `pointer` }}>
                  <Delete />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
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
