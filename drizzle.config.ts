import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'

export default defineConfig({
    dialect: 'sqlite',
    out: 'drizzle',
    schema: './src/db/schema.ts',
  // // dbCredentials needs only for connect drizzle studio
  //   dbCredentials: {
  //    url: './drizzle/local/v3/d1/miniflare-D1DatabaseObject/6e43194546f211ee1e4c13e0ada4aca104342f596859f2d2a19c1da261566494.sqlite' 
  //   },
  });