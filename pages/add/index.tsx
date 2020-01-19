import React, { useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { NextPage } from "next"
import { Formik, Form, Field, FieldArray } from "formik"
import fetch from "isomorphic-unfetch"

import Layout from "../../components/Layout"

const PLATFORMS = ["Web", "iOS"]
const INITIAL_VALUES = {
  name: "",
  description: "",
  properties: [] as string[],
  platforms: [] as string[],
}

const Add: NextPage = () => {
  const router = useRouter()
  const ref = useRef<HTMLInputElement>()
  return (
    <Layout title="Analytics | Add">
      <h1>Add a New Event</h1>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await fetch(`/api/add`, {
              method: "post",
              body: JSON.stringify(values),
            })
            setSubmitting(false)
            router.push("/events")
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
                <h3>Name</h3>
                <Field name={"name"} placeholder={"name"} />
              </div>
              <div>
                <h3>Description</h3>
                <Field
                  name={"description"}
                  as="textarea"
                  placeholder={"description"}
                />
              </div>
              <h3>Properties</h3>
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
              <h3>Platforms</h3>
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
                          checked={values.platforms.includes(_platform)}
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

export default Add
