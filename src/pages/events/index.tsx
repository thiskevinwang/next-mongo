import React, { useState } from "react"
import Link from "next/link"
import styled from "styled-components"
import useSwr from "swr"

import { useTransition, animated } from "react-spring"

import { EventDocument } from "interfaces"
import Layout from "components/Layout"

import { Delete, Edit } from "svgs"

const Modal = styled(animated.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  max-width: calc(100vw - 20px);
  background: var(
    ${props => (props.theme.isDarkMode ? `--accents-8` : `--accents-1`)}
  );
  border-color: var(--accents-4);
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  box-shadow: var(--shadow-medium);
  overflow: hidden;
`
const ModalBody = styled.div`
  display: block;
  padding: var(--geist-gap);
  border-bottom-color: var(--accents-4);
  border-bottom-style: solid;
  border-bottom-width: 0.2px;
`
const ModalAction = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  text-decoration: none;
  padding: var(--geist-gap) 0px;
  flex: 1 1 100%;
  background: var(
    ${props => (props.theme.isDarkMode ? `--accents-8` : `--accents-1`)}
  );
  color: var(${props => (props.theme.isDarkMode ? `--light` : `--dark`)});

  transition: background 200ms ease-in-out;

  &:hover {
    background: var(
      ${props => (props.theme.isDarkMode ? `--accents-7` : `--accents-2`)}
    );
  }

  &:last-child {
    border-left-color: var(--accents-4);
    border-left-style: solid;
    border-left-width: 0.2px;
  }
`

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
  const { data, error, revalidate } = useSwr<EventDocument[]>(
    "/api/events",
    fetcher
  )

  const [eventToDelete, setEventToDelete] = useState<EventDocument>(
    (null as unknown) as EventDocument
  )
  const transitions = useTransition(eventToDelete, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  if (!data) return <>"Loading..."</>
  if (error) return <>`Error: ${error}`</>

  return (
    <Layout title="Events">
      <h2>Events</h2>
      <div style={{ overflowX: `scroll` }}>
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
                  <a
                    style={{ marginRight: `0.5rem`, cursor: `pointer` }}
                    onClick={() => setEventToDelete(e)}
                  >
                    <Delete />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
      {transitions.map(({ item, props }) =>
        item ? (
          <Modal style={props}>
            <ModalBody>
              <header style={{ padding: `19px 14px` }}>
                <h3 style={{ textAlign: `center`, fontWeight: 300 }}>
                  <h2 style={{ marginTop: 0, marginBottom: `10pt` }}>
                    Delete this event?
                  </h2>
                  <h5 style={{ marginTop: 0, marginBottom: `10pt` }}>
                    <code>{item.name}</code>
                  </h5>
                </h3>
              </header>
              <p className="text" style={{ margin: 0, fontWeight: 300 }}>
                {item.description}
              </p>
            </ModalBody>
            <footer
              style={{
                display: `flex`,
              }}
            >
              <ModalAction
                onClick={() => {
                  setEventToDelete((null as unknown) as EventDocument)
                }}
              >
                Cancel
              </ModalAction>
              <ModalAction
                onClick={async () => {
                  if (!eventToDelete._id) return
                  const deleted = await fetch(
                    `/api/events/delete/${eventToDelete._id}`,
                    {
                      method: "delete",
                      body: JSON.stringify(eventToDelete),
                    }
                  )
                  setEventToDelete((null as unknown) as EventDocument)
                  revalidate()
                }}
              >
                Submit
              </ModalAction>
            </footer>
          </Modal>
        ) : null
      )}
    </Layout>
  )
}

export default Events
