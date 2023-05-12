import { Client } from "pg";

const client: Client = new Client({
  user: 'Karol',
  password: 'karol123',
  host: 'localhost',
  port: 5432,
  database: 'Karol'
})
const startDatabase = async (): Promise<void> => {
  await client.connect()
  console.log("conectado! :)")
}

export {client, startDatabase}