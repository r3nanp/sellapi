import { Connection, createConnection, getConnection } from 'typeorm'

class PostgresMock {
  private database: Connection

  async connect(): Promise<void> {
    this.database = await createConnection()
  }

  async runMigrations(): Promise<void> {
    await this.database.runMigrations()
  }

  async query(query: string): Promise<void> {
    await this.database.query(query)
  }

  getConnection(): Connection {
    this.database = getConnection()

    return this.database
  }

  async dropDatabase(): Promise<void> {
    await this.database.dropDatabase()
  }

  disconnect(): Promise<void> {
    return this.database.close()
  }
}

export default new PostgresMock()
