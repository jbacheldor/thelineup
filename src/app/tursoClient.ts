import { createClient } from "@libsql/client";

export const createDBClient = () => {
  if(process.env.TURSO_DATABASE_URL) {
    const x = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    return x
  } else {
    throw new Error('wheee error in creating this')
  }
}


export const turso2 = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN,
});