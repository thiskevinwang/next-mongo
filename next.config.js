require("dotenv").config()
module.exports = {
  env: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME,
    COLLECTION_NAME: process.env.COLLECTION_NAME,
  },
}
