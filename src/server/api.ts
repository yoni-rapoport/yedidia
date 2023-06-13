import { config } from "dotenv"
config()

import { remultExpress } from "remult/remult-express"
import UtilsController from "./utilsController"
import { initRequest } from "./server-session"
import { SignInController } from "../controllers/sign-in-controller"
import { Department } from "../model/department"
import { Patient } from "../model/patient"
import { PatientImage } from "../model/PatientImage"
import { PatientAnswer } from "../model/PatientAnswer"
import { Pool } from "pg"
import { Remult, SqlDatabase } from "remult"
import { PostgresDataProvider, PostgresSchemaBuilder } from "remult/postgres"
import { PostgresSchemaWrapper } from "./PostgresSchemaWrapper"

const entities = [Department, Patient, PatientAnswer, PatientImage]

export const api = remultExpress({
  dataProvider: async () => {
    if (process.env["VITE"]) return undefined // use json db on dev
    const pool = new Pool({
      connectionString: process.env["DATABASE_URL"],
      ssl: process.env["DEV"]
        ? false
        : {
            rejectUnauthorized: false,
          },
    })
    const result = new SqlDatabase(
      new PostgresDataProvider(
        new PostgresSchemaWrapper(pool, process.env["DB_SCHEMA"]!)
      )
    )
    const sb = new PostgresSchemaBuilder(result, process.env["DB_SCHEMA"])
    const remult = new Remult(result)
    await sb.ensureSchema(entities.map((e) => remult.repo(e as any).metadata))
    return result
  },
  ensureSchema: false,
  initRequest: initRequest,
  entities,
  controllers: [UtilsController, SignInController],
})
