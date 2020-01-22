require("dotenv").config()
const path = require("path")

module.exports = {
  webpack(config, options) {
    config.resolve.alias["src"] = path.join(__dirname, "src")
    config.resolve.alias["components"] = path.join(__dirname, "src/components")
    config.resolve.alias["hooks"] = path.join(__dirname, "src/hooks")
    config.resolve.alias["interfaces"] = path.join(__dirname, "src/interfaces")
    config.resolve.alias["svgs"] = path.join(__dirname, "src/svgs")
    config.resolve.alias["theme"] = path.join(__dirname, "src/theme")
    config.resolve.alias["utils"] = path.join(__dirname, "src/utils")
    return config
  },
  env: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME,
    COLLECTION_NAME: process.env.COLLECTION_NAME,
  },
}
