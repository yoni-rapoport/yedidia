import express from "express"
import helmet from "helmet"
import compression from "compression"
import { api } from "./api"
import session from "cookie-session"

export const app = express()
app.use(
  session({
    secret:
    // in dev use the "dev secret" as the key for sessions
      process.env["SESSION_SECRET"] || (process.env["VITE"] && "dev secret"),
  })
)
app.use(api)
if (!process.env["VITE"]) {
  app.use(helmet())
  app.use(compression())
  const dist = process.cwd() + "/dist"
  app.use(express.static(dist))
  app.get("/*", (_, res) => {
    res.sendFile(dist + "/index.html")
  })
  app.listen(process.env["PORT"] || 3002, () => console.log("Server started"))
}
