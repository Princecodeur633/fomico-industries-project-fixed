export default ({ env }) => {
  // Two supported modes, auto-selected from your .env — no code changes needed:
  //
  // 1) Neon (or any managed Postgres reachable via a connection string):
  //    set DATABASE_URL="postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/dbname?sslmode=require"
  //
  // 2) Local / Docker Postgres (the `fomico-postgres` service in docker-compose.yml):
  //    leave DATABASE_URL empty and set DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD instead
  //    (see .env.example — these already match docker-compose.yml's defaults)
  const databaseUrl = env('DATABASE_URL');

  const connection = databaseUrl
    ? {
        connectionString: databaseUrl,
        // Neon requires TLS. Default to true whenever a connection string is used;
        // set DATABASE_SSL_REJECT_UNAUTHORIZED=false only if you hit self-signed
        // certificate errors (e.g. behind some connection poolers).
        ssl: env.bool('DATABASE_SSL', true) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      }
    : {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        // Local Postgres (e.g. the Docker container) has no TLS by default.
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      };

  return {
    connection: {
      client: 'postgres',
      connection,
      pool: {
        // Neon's pooled endpoint (PgBouncer-based) can silently drop connections
        // that sit idle in our own pool, which then surfaces as "Connection ended
        // unexpectedly" errors. Defaulting min to 0 when using a connection string
        // avoids holding idle connections open — Neon's own pooler handles reuse.
        min: env.int('DATABASE_POOL_MIN', databaseUrl ? 0 : 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      // Remote/managed databases (e.g. Neon reached from far away) need more time
      // to establish a connection than a local Postgres instance does.
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', databaseUrl ? 120000 : 60000),
    },
  };
};
