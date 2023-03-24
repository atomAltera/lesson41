import {start as startServer} from './web/server'
import database from "./db";


async function main() {
    console.log("[INFO] Starting application")

    console.log("[INFO] Connecting to database")
    await database.connect("mongodb://localhost:27017/lesson41")
    console.log("[INFO] Connected to database")

    console.log("[INFO] Starting server")
    startServer(3001)
}


main().catch(err => console.error(err))
