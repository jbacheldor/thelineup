import { createClient } from "@libsql/client";

export const createDBClient = () => {
  console.log('process.env.TURSO_DATABASE_URL',process.env.TURSO_DATABASE_URL)
  
  if(process.env.TURSO_DATABASE_URL) {
    const x = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    return x
  } else {
    console.log('throwing an error we cant see process env')
    throw new Error('wheee error in creating this')
  }
}