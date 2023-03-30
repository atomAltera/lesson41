import {start as startServer} from './web/server'
import database from "./db";


async function main() {
    console.log("[INFO] Starting application")

    console.log("[INFO] Connecting to database")
    await database.connect("mongodb+srv://lenaposh1207:1234567890QAZ@cluster0.3zf1rvo.mongodb.net/test")
    console.log("[INFO] Connected to database")

    console.log("[INFO] Starting server")
    startServer(3001)
}


main().catch(err => console.error(err))
