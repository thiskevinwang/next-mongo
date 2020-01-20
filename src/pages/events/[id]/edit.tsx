import { useRef } from "react"
import { NextPageContext, NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { Formik, Form, Field, FieldArray } from "formik"

import Layout from "../../../../components/Layout"
import { sampleFetchWrapper } from "../../../utils/sample-api"
import { EventDocument } from "../../../../interfaces"

interface Props {
  event?: EventDocument
  errors?: string
}

const PLATFORMS = ["Web", "iOS"]

const EditEventById: NextPage<Props> = ({ event }) => {
  const router = useRouter()
  const { id } = router.query
  const ref = useRef<HTMLInputElement>()
  return (
    <Layout title="Analytics | Edit">
      <h1>Edit</h1>
      <Formik
        initialValues={{
          name: event?.name,
          description: event?.description,
          properties: event?.properties as string[],
          platforms: event?.platforms as string[],
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await fetch(`/api/edit/${id}`, {
              method: "post",
              body: JSON.stringify(values),
            })
            console.log(values)
            setSubmitting(false)
            router.push(`/events/${id}`)
          } catch (err) {
            console.error(err)
            setSubmitting(false)
          }
        }}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form>
              <div>
                <h2>Name</h2>
                <Field name={"name"} placeholder={"name"} />
              </div>
              <div>
                <h2>Description</h2>
                <Field
                  name={"description"}
                  as="textarea"
                  placeholder={"description"}
                />
              </div>
              <h2>Properties</h2>
              <FieldArray
                name="properties"
                render={arrayHelpers => (
                  <div>
                    {values.properties?.length > 0 ? (
                      values.properties.map((_property, index) => (
                        <div key={index}>
                          <Field
                            innerRef={
                              values.properties?.length === index + 1
                                ? ref
                                : null
                            }
                            name={`properties.${index}`}
                            placeholder={"ex. cart_id"}
                            onBlur={(e: any) => {
                              const isLatest = e.target === ref.current
                              const isEmpty =
                                _property.substring(0).trim().length < 1
                              if (isEmpty && !isLatest) {
                                arrayHelpers.remove(index)
                              }
                            }}
                          />
                          {values.properties?.length === index + 1 && (
                            <>
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (_property.length < 1) {
                                    ref.current?.focus()
                                  } else {
                                    arrayHelpers.push("")
                                  }
                                }}
                              >
                                +
                              </button>
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        Add a property
                      </button>
                    )}
                  </div>
                )}
              />
              <h2>Platforms</h2>
              <FieldArray
                name="platforms"
                render={arrayHelpers => (
                  <div style={{ display: "flex", marginBottom: `1rem` }}>
                    {PLATFORMS.map((_platform, index) => (
                      <div
                        key={_platform + index}
                        style={{ marginRight: `1rem` }}
                      >
                        <Field
                          type="checkbox"
                          id={`platforms.${index}`}
                          name={`platforms.${index}`}
                          checked={values.platforms?.includes(_platform)}
                          onChange={(e: any) => {
                            const isChecked: boolean = e.target.checked
                            isChecked
                              ? arrayHelpers.push(_platform)
                              : arrayHelpers.remove(
                                  values.platforms.indexOf(_platform)
                                )
                          }}
                        />
                        <label htmlFor={`platforms.${index}`}>
                          {_platform}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              />
              <div>
                <button type={"submit"} disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
      <p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </p>
    </Layout>
  )
}

EditEventById.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const { id } = query
    const event = await sampleFetchWrapper(
      `/api/events/${Array.isArray(id) ? id[0] : id}`
    )
    return { event }
  } catch (err) {
    return { errors: err.message }
  }
}

export default EditEventById
