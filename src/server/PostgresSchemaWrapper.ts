import { Pool, PoolClient, QueryResult } from "pg"
import { PostgresPool } from "remult/postgres"

export class PostgresSchemaWrapper implements PostgresPool {
  constructor(private pool: Pool, private schema: string) {}
  async connect(): Promise<PoolClient> {
    let r = await this.pool.connect()

    await r.query("set search_path to " + this.schema)
    return r
  }
  async query(queryText: string, values?: any[]): Promise<QueryResult> {
    let c = await this.connect()
    try {
      return await c.query(queryText, values)
    } finally {
      c.release()
    }
  }
}
