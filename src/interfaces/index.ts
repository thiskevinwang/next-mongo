// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

/**
 * This is the shape of a single `document` in the
 * `names` collection in the `analytics` mongo database.
 */
export interface EventDocument {
  _id: string
  name: string
  description: string
  properties?: string[]
  platforms?: string[]
  group?: string
}
