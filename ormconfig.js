module.exports = {
  type: 'postgres',
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  cli: {
    migrationsDir: [process.env.TYPEORM_MIGRATIONS_DIR]
  }
}